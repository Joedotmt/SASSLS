import { writable } from 'svelte/store';

type Theme = 'blue-light' | 'blue-dark' | 'red-light' | 'red-dark' | 'green-light' | 'green-dark'; // Add more as needed
const availableThemes = ['blue-light', 'blue-dark', 'red-light', 'red-dark', 'green-light', 'green-dark']


const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') as Theme : 'blue-light';
export const theme = writable<Theme>(storedTheme || 'blue-light');
export const AvailableThemes = availableThemes;

theme.subscribe(value => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', value);
    }
});