<script>
    let dialog;

    const toggleDialog = () => {
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.showModal();
        }
    };

    const handleDialogClick = (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    };
</script>

<button class="chip" onclick={toggleDialog}>
    <slot name="head" /><span class="symbol"> arrow_drop_down </span>
</button>

<dialog bind:this={dialog}>
    <div style="flex-direction: row; align-items: center; gap: 0.5em;">
        <button onclick={toggleDialog} style="width: 40px; height: 40px; border: 0;" class="button-circle">
            <span class="symbol"> close </span>
        </button>
        <slot name="head" />
    </div>

    <slot name="details" />
</dialog>

<style>
    .chip {
        font-size: 0.9em;
        padding: 0.4em 0.6em 0.4em 1em;
        gap: 0.3em;
        border-radius: 10px;
        width: max-content;
        flex-shrink: 0;
    }

    dialog {
        padding: 1rem;
        width: 300px;
        background-color: var(---surface-1);
    }
</style>
