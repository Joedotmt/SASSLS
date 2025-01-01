<script>
    let {
        message = "Are you sure?",
        confirmText = "Confirm",
        cancelText = "Cancel",
        dialog = $bindable(),
        confirm = $bindable(),
        cancel = $bindable(),
    } = $props();
</script>

<dialog style="padding: 1em;" bind:this={dialog} class="confirmation-dialog">
    <div style="padding: 1rem 11rem 3rem 1rem; font-size: 1.2em;">
        {message}
    </div>
    <div style="display: flex; justify-content: flex-end;">
        <button
            onclick={() => {
                cancel();
                dialog.close();
            }}
            style="margin-right: 0.6em; border: 0; width: 7em;"
        >
            {cancelText}
        </button>
        <button
            onclick={() => {
                confirm();
                dialog.close();
            }}
            style="border: 0; width: 7em;"
        >
            {confirmText}
        </button>
    </div>
</dialog>
