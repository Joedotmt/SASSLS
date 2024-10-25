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
        type = "text"
    } = $props();

    let cleee = placeholder.length >= 1 ? "input_placeholder_force_up" : "";

    let inputElement = $state();

    // Collect dynamic attributes.
    let inputAttributes = {
        min,
        autocomplete,
        placeholder,
        type,
    };
</script>

<div {style} class="input-container">
    <input
        bind:this={inputElement}
        bind:value
        class="input-google"
        {...inputAttributes}
    />
    <label class="input-placeholder {cleee}">{label}</label>
</div>
