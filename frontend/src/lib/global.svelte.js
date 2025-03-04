import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { SvelteSet } from "svelte/reactivity";
import { pb } from "$lib/pocketbase.svelte.js";

export const config = $state({
    logo: "",
    domain: ""
});

export const global = $state({
    // App Manager
    change_page: (page, skip_confirmation = false) =>
    {
        const navigate = () =>
        {
            global.unsaved_changes = false;
            document.startViewTransition(() =>
            {
                goto(`${base}/${page}`);
                document.body.querySelector(".container-scroller").style.display = "none";
            });
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
            constants.books.subjects = await pb.collection("books_subjects").getFullList({
                sort: "+n",
                fields: "n,id",
            });
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
        return `./book_placeholder_covers/book_placeholder_${index}.png`;
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
    borrowers: {
        defaultItem: {
            name: "",
            surname: "",
            group: "",
        },
        groups: ["Teacher", "Admin", "Maintenance", "LSE", "8.1", "8.2", "8.3", "8.4", "9.1", "9.2", "9.3", "9.4", "10.1", "10.2", "10.3", "10.4", "11.1", "11.2", "11.3", "11.4", "12.1", "12.2", "12.3", "12.4", "Other"]
    },
    books: {
        levels: ["Brown", "Yellow", "Blue", "Green", "Red"],
        subjects: [],
        defaultItem: {
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

export const theme = $state({
    currentTheme: JSON.parse(localStorage.getItem("theme")) || {
        mode: "dark",
        books: "blue",
        borrowers: "red",
        transactions: "green",
    }
});