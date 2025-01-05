import { browser } from "$app/environment";
import { writable } from 'svelte/store';

let initialTheme = {
    mode: "dark",
    books: "blue",
    borrowers: "green",
    transactions: "red"
};

if (browser)
{
    const stored = localStorage.getItem('theme');
    initialTheme = stored ? JSON.parse(stored) : initialTheme;
}

export let themeStore = writable(initialTheme);

if (browser)
{
    themeStore.subscribe((value) => localStorage.setItem('theme', JSON.stringify(value)));
}

const transitionManager = () =>
{
    // Create HTML style element with CSS selector that targets all
    // elements and applies CSS to disable transitions
    const style = document.createElement("style");
    const css = document.createTextNode(`* {
                    transition: none !important;
                }`);
    style.appendChild(css);

    // Create functions for adding and removing the style element from
    // the page <head> tag
    const enable = () =>
    {
        // Check if style element is in the DOM before removing
        if (style.parentNode)
        {
            document.head.removeChild(style);
        }
    };

    const disable = () =>
    {
        // Check if style element is already in the DOM to avoid adding it multiple times
        if (!style.parentNode)
        {
            document.head.appendChild(style);
        }
    };

    return { enable, disable, style };
};

$: {
    if (browser)
    {
        const transitions = transitionManager();
        transitions.disable();

        // Subscribe to the themeStore to get the current theme value
        themeStore.subscribe((currentTheme) =>
        {
            // Safely set the class based on the theme and current route
            const currentPath = window.location.pathname.split("/")[1];
            document.body.className = `${currentTheme[currentPath] || "blue"}-${currentTheme.mode}`;

            // Trigger reflow (required for transition disabling)
            window.getComputedStyle(transitions.style).opacity;

            transitions.enable();
        });
    }
}
