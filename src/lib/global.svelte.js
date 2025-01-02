import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { SvelteSet } from "svelte/reactivity";
import pb from "$lib/pocketbase";

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
    loading_items: new SvelteSet(),
    fetchSubjects: async () =>
    {
        try
        {
            const subjects = await pb.collection("books_subjects").getFullList({
                sort: "+subject",
                fields: "resource,subject,id",
            });
            constants.books.subjects = subjects;
        } catch (err)
        {
            console.error("Error fetching subjects:", err);
        }
    }
});
export let confirmationDialog = $state({
    dialog: null,
    confirm: () => { },
    cancel: () => { }
});

export let objects = $state({
    searchPanel: { minimized: false }
});

export const constants = $state({
    borrowers: {},
    books: {
        levels: [
            { label: "Brown", id: "Brown" },
            { label: "Yellow", id: "Yellow" },
            { label: "Blue", id: "Blue" },
            { label: "Green", id: "Green" },
            { label: "Red", id: "Red" }
        ],
        subjects: []
    }
});
