<script>
    import { run } from "svelte/legacy";

    /**
     * @typedef {Object} Props
     * @property {string} [value]
     * @property {string} [style]
     */

    /** @type {Props} */
    let { value = $bindable("-"), style = "" } = $props();
    let isAscending = $state(value === "+"); // Initialize based on the incoming value
    // Watch for changes in value to set isAscending accordingly
    run(() => {
        isAscending = value === "+";
    });

    // Handle button click to toggle isAscending state and update value
    function handleClick() {
        isAscending = !isAscending;
        value = isAscending ? "+" : "-"; // Update the value prop based on isAscending
    }
</script>

<button
    onclick={handleClick}
    style="    border-radius: 0.4em;
    height: auto;
    margin: 0.5em;
    width: 100%;
    flex-shrink: 1;
    max-width: 100px; {style}"
    class="button-circle"
    aria-label={isAscending ? "Sort Descending" : "Sort Ascending"}
>
    <span
        style="transform: rotate({isAscending
            ? 180
            : 0}deg); transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);"
        class="symbol"
    >
        arrow_upward
    </span>
</button>
