<script>
    /**
     * @typedef {Object} Props
     * @property {string} [label]
     * @property {string} [placeholder]
     * @property {string} [value]
     * @property {string} [style]
     * @property {string} [min]
     * @property {string} [autocomplete]
     * @property {string} [type]
     */

    /** @type {Props} */
    let { input_style = "", style = "", label = "label", placeholder = "", value = $bindable(""), label_style = "", min = "0", autocomplete = "off", type = "text", children, error } = $props();

    let inputElement = $state(null);
</script>

{#if type == "textarea"}
    <div style="align-items: normal; {style}" class="input-container">
        <textarea style="resize: none; font-size: 1em; height: 100px; {input_style}" type="text" bind:this={inputElement} bind:value {placeholder} class="input-google {placeholder.length >= 1 ? 'force-up' : ''}"></textarea>

        <label style="{label_style ? '' : '--translate-y: -17px'}{label_style}" class="input-placeholder">{label}</label>
    </div>
{:else if type == "select"}
    <div {style} class="input-container">
        <select style={input_style} bind:this={inputElement} bind:value class="input-google force-up">
            {@render children()}
        </select>
        <label style={label_style} class="input-placeholder">{label}</label>
    </div>
{:else}
    <div {style} class="input-container">
        <input {type} style={input_style} {placeholder} bind:this={inputElement} bind:value class="input-google {placeholder.length >= 1 ? 'force-up' : ''} {error ? 'error' : ''}" />
        <label style={label_style} class="input-placeholder {error ? 'error' : ''}">{label}</label>
    </div>
{/if}

<style>
    .input-google.error {
        box-shadow:
            inset 0px 0px 0px 1.2px rgb(255, 80, 80),
            0px 0px 0px 0px var(---neutral-variant60);
    }
    .input-placeholder.error {
        color: rgb(255, 80, 80) !important;
    }

    .input-container {
        display: flex;
        align-items: center;
        width: 100%;
        flex-direction: row;
    }

    .input-container .input-google:is(:focus, :not(:placeholder-shown), .force-up) + .input-placeholder {
        font-size: 13px;
        translate: 0px var(--translate-y);
        background-color: var(---surface-0);
        opacity: 1;
        transition-delay: 0s;
        color: var(---on-background);
    }

    /* When focused */
    .input-container .input-google:focus + .input-placeholder {
        /* turn blue */
        font-size: var(--tiny-size);
        color: var(---primary-80);
    }

    .input-placeholder {
        position: absolute;
        margin: 6px;
        --tiny-size: 15px;
        --translate-y: -20px;
        font-size: 1.3rem;
        opacity: 0.8;
        pointer-events: none;
        color: var(---on-background);
        transition:
            translate 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            font-size 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            background-color 0s;
        padding: 5px;
        padding-bottom: 0;
        padding-top: 0;
        background-color: transparent;
    }
</style>
