<script>
    let { message = "Are you sure?", confirmText, cancelText, dialog = $bindable(), confirm = $bindable(), cancel = $bindable(), style } = $props();
</script>

<dialog style="padding: 1em; {style}" bind:this={dialog} class="confirmation-dialog">
    <div style="padding: 1rem 11rem 3rem 1rem; font-size: 1.2em;">
        {message}
    </div>
    <div style="display: flex; justify-content: flex-end; flex-direction: row;">
        {#if cancelText}
            <button
                onclick={() => {
                    cancel();
                    dialog.close();
                }}
                style="margin-right: 0.6em; border: 0; width: 7em;"
            >
                {cancelText}
            </button>
        {/if}
        {#if confirmText}
            <button
                onclick={() => {
                    if (confirm) {
                        confirm();
                    }
                    dialog.close();
                }}
                style="border: 0; width: 7em;"
            >
                {confirmText}
            </button>
        {/if}
    </div>
</dialog>
