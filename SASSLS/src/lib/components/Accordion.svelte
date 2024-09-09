<script>
    export let open = false;
    import { slide } from "svelte/transition";
    const handleClick = () => (open = !open);
</script>

<div class="accordion">
    <div class="header">
        <button class={open ? "open" : ""} on:click={handleClick}>
            <slot name="head"></slot>
            <span
                style="rotate: {open ? 0 : 180}deg;"
                class="material-symbols-outlined"
            >
                keyboard_arrow_down
            </span>
        </button>
    </div>

    <div
        style="overflow-y:scroll; margin-top: 0.3em; height: {open
            ? 400
            : 0}px;"
        class="details"
        transition:slide
    >
        <slot name="details"></slot>
    </div>
</div>

<style>
    div.accordion {
        margin: 1rem 0;
    }

    div.header {
        display: flex;
        width: 100%;
    }

    button {
        width: 100%;
        justify-content: space-between;
        padding: 0.5em 20px;
        border-radius: 0.5em;
        background-color: var(---surface-2);
        border-width: 0px;
        transition: 225ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    button.open {
        padding: 1em 20px;
    }

    .material-symbols-outlined {
        transition: 225ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    div.details {
        transition: 225ms cubic-bezier(0.4, 0, 0.2, 1);
        display: block;
        overflow: hidden;
        height: 0px;
        margin: 0em;
        border-radius: 0.5em;
        background: var(---surface-1);
    }
</style>
