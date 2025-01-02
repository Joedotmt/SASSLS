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
    let {
        label = "label",
        placeholder = "",
        value = $bindable(""),
        style = "",
        min = "0",
        autocomplete = "off",
        type = "text",
    } = $props();

    let extra_classes =
        placeholder.length >= 1 ? "input_placeholder_force_up" : "";

    let inputElement = $state(null);
</script>

{#if type != "textarea"}
    <div {style} class="input-container">
        <input
            {placeholder}
            bind:this={inputElement}
            bind:value
            class="input-google"
        />
        <label class="input-placeholder {extra_classes}">{label}</label>
    </div>
{:else if type == "textarea"}
    <div
        style="margin-bottom: 1em; align-items: normal;"
        class="input-container"
    >
        <textarea
            style="resize: none; font-size: 1em; height: 100px;"
            type="text"
            bind:this={inputElement}
            bind:value
            {placeholder}
            class="input-google"
        ></textarea>
        <label
            style="--translateamount: -1.15em;"
            class="input-placeholder {extra_classes}">{label}</label
        >
    </div>
{/if}

<style>
    .input-container {
        display: flex;
        align-items: center;
        width: 100%;
        flex-direction: row;
    }

    .input-container
        input:not(:focus):not(:placeholder-shown)
        + .input-placeholder {
        font-size: 13px;
        translate: 0px -1.2rem;
        background-color: var(---surface-0);
        opacity: 1;
        transition-delay: 0s;
        color: var(---on-background);
    }

    /* When focused */
    .input-container input:focus + .input-placeholder,
    .input-container select:focus + .input-placeholder,
    .input-container textarea:focus + .input-placeholder {
        /* Move up and turn blue */
        font-size: calc(min(4vw, 23px) * 0.6);
        translate: 0px -1.25rem;
        background-color: var(---surface-0);
        opacity: 1;
        transition-delay: 0s;
        color: var(---primary-80);
    }

    .input-container
        textarea:not(:focus):not(:placeholder-shown)
        + .input-placeholder,
    .input-container textarea:focus + .input-placeholder {
        translate: 0px -1.15em;
    }

    .input_placeholder_force_up {
        font-size: calc(min(4vw, 23px) * 0.6);
        translate: 0px -1.25rem;
        background-color: var(---surface-0);
        opacity: 1;
        transition-delay: 0s;
        color: var(---on-background);
    }
</style>
