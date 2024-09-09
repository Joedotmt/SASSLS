<script>
    let data;
    let checked = false;
    function handleClick() {
        checked = !checked;
    }
</script>

<button
    class={checked ? "checked" : ""}
    bind:this={data}
    on:click={handleClick}
>
    <span
        style="font-size:{checked ? '20' : '0'}px; margin-right: 0.3em;"
        class="material-symbols-outlined"
    >
        check
    </span>
    <slot></slot>
</button>

<style>
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
</style>
