import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { SvelteSet } from "svelte/reactivity";

export const global = $state({
    // App Manager
    change_page: (page, skip_confirmation = false) =>
    {
        const navigate = () =>
        {
            global.unsaved_changes = false;
            goto(`${base}/${page}/`);
        };

        if (!global.unsaved_changes || skip_confirmation)
        {
            navigate();
            return;
        }

        confirmationDialog.dialog.showModal();
        confirmationDialog.confirm = navigate;
    },
    unsaved_changes: false,
    loading_items: new SvelteSet()
});
export let confirmationDialog = $state({
    dialog: null,
    confirm: () => { },
    cancel: () => { }
});