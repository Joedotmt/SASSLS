<script>
    import { run } from "svelte/legacy";

    import { createEventDispatcher } from "svelte";

    /**
     * @typedef {Object} Props
     * @property {boolean} [checked]
     * @property {boolean} [disabled]
     * @property {string} [ariaLabel]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { checked = $bindable(false), disabled = false, ariaLabel = "Toggle", children } = $props();

    let data = $state();
    const dispatch = createEventDispatcher();

    function handleClick() {
        if (!disabled) {
            checked = !checked;
            dispatch("clicked", { checked });
        }
    }

    run(() => {
        if (data) {
            data.setAttribute("aria-checked", checked);
        }
    });
</script>

<button class={`toggle ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}`} bind:this={data} onclick={handleClick} aria-label={ariaLabel} role="switch" {disabled}>
    <span style="font-size:{checked ? '20' : '0'}px; margin-right: 0.3em;" class="symbol"> check </span>
    {@render children?.()}
</button>

<style>
    /* Styles remain unchanged */
    button {
        border-radius: 0.5em;
        padding: 0.3em 0.5em;
        background-color: var(---surface-5);
        border: 0;
        color: var(---on-background);
    }
    button:hover {
        background-color: color-mix(in srgb, var(---surface-5) 90%, black 10%) !important;
    }

    button.checked {
        background-color: var(---primary-30);
        color: var(---neutral-90);
    }
    button.checked:hover {
        background-color: color-mix(in srgb, var(---primary-30) 80%, black 20%) !important;
    }

    span {
        transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
