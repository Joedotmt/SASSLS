<script>
    import { createEventDispatcher } from "svelte";

    export let checked = false;
    export let disabled = false;
    export let ariaLabel = "Toggle";

    let data;
    const dispatch = createEventDispatcher();

    function handleClick() {
        if (!disabled) {
            checked = !checked;
            dispatch("change", { checked });
        }
    }

    $: {
        if (data) {
            data.setAttribute("aria-checked", checked);
        }
    }
</script>

<button
    class={`toggle ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}`}
    bind:this={data}
    on:click={handleClick}
    aria-label={ariaLabel}
    role="switch"
    {disabled}
>
    <span
        style="font-size:{checked ? '20' : '0'}px; margin-right: 0.3em;"
        class="symbol"
    >
        check
    </span>
    <slot></slot>
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
        background-color: var(---surface-3) !important;
    }

    button.checked {
        background-color: var(---primary-30);
    }
    button.checked:hover {
        background-color: color-mix(
            in srgb,
            var(---primary-30) 70%,
            transparent 30%
        ) !important;
    }

    span {
        transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
