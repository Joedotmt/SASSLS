<!-- @migration-task Error while migrating Svelte code: Unexpected token -->
<script>
    import { slide } from "svelte/transition";
    let { open = false, expandedHeight = null, overflowy = "auto", head, style = "", details } = $props();

    const handleClick = () => {
        open = !open;
        setHeight();
    };
    let contentEle = null;

    let heightcss = $state("0px");

    function setHeight() {
        if (open) {
            if (expandedHeight == null) heightcss = "fit-content";
            else heightcss = expandedHeight + "px";
        } else {
            heightcss = "0px";
        }
    }
</script>

<div {style} class="accordion {open ? 'open' : ''}">
    <div class="header">
        <button class={open ? "open" : ""} onclick={handleClick}>
            {@render head?.()}
            <span style="rotate: {open ? 0 : 180}deg;" class="symbol"> keyboard_arrow_down </span>
        </button>
    </div>

    <div style="overflow-y: {overflowy}; margin-top: {open * 0.3}em; height: {heightcss};" class="details" transition:slide bind:this={contentEle}>
        {@render details?.()}
    </div>
</div>

<style>
    div.accordion {
        margin: 0;
        transition: 0.2s;
    }
    div.accordion.open {
        margin-bottom: 0.6em;
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
        background-color: var(---surface-1);
        border-width: 0px;
        transition: 225ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    button.open {
        padding: 1em 20px;
        background-color: var(---surface-3);
    }

    .symbol {
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

    span {
        transition: rotate 225ms cubic-bezier(0.4, 0, 0.2, 1);
    }
</style>
