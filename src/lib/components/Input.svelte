<script>
    export let label = "label";
    export let placeholder = "";
    export let value = ""; // Two-way binding.
    export let style = "";
    export let min = "0";
    export let autocomplete = "off";
    export let type = "text"; // No need to export as const

    let cleee = placeholder.length >= 1 ? "input_placeholder_force_up" : "";

    let inputElement;

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
