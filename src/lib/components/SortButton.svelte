<script>
    export let value = "-"; // Default value
    let isAscending = value === "+"; // Initialize based on the incoming value
    export let style = ""; // Additional styles for the button

    // Watch for changes in value to set isAscending accordingly
    $: {
        isAscending = value === "+";
    }

    // Handle button click to toggle isAscending state and update value
    function handleClick() {
        isAscending = !isAscending;
        value = isAscending ? "+" : "-"; // Update the value prop based on isAscending
    }
</script>

<button
    on:click={handleClick}
    style="border-radius: 0.4em; margin: 0px 0px 0px 0.5em; height: auto; width: 3em; {style}"
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
