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
            goto(`${base}/${page}`);
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
                sort: "+n",
                fields: "n",
            });

            // turns it into an array
            constants.books.subjects = subjects.map(i => i.n);
        } catch (err)
        {
            console.error("Error fetching subjects:", err);
        }
    },
    getRandomBookCover: (id) =>
    {
        if (id == null) return;
        let hash = 0;
        for (let i = 0; i < id.length; i++)
        {
            hash = (hash * 31 + id.charCodeAt(i)) % 1000000007; // Hash function with a prime modulus
        }

        // Use the hash to determine the index
        const index = (hash % 5) + 1; // Modulus ensures the index is between 1 and 5
        return `/book_placeholder_covers/book_placeholder_${index}.png`;
    },
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
        subjects: [],
        defaultBook: {
            legacy_book_id: "_",
            title: "",
            author: "",
            isbn: "",
            description: "",
            classification_label: "",
            level: "",
            subject: "",
            scrapped: false,
            lost: false,
            price: 0,
            preview_url_override: "",
        }
    }
});
