<script>
    let { isAscending = $bindable(true), style = "" } = $props();

    function handleClick() {
        isAscending = !isAscending;
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
            ? 0
            : 180}deg); transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);"
        class="symbol"
    >
        sort
    </span>
</button>
