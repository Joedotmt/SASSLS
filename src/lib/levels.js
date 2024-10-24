import { readable, writable } from 'svelte/store';
import pb from "$lib/pocketbase";

// Global object with read-only data
export const BookLevelsStore = readable([
    { label: "Brown", id: "Brown" },
    { label: "Yellow", id: "Yellow" },
    { label: "Blue", id: "Blue" },
    { label: "Green", id: "Green" },
    { label: "Red", id: "Red" }
]);

export let BookSubjectsStore = writable(null);

export async function fetchGlobalSubjects()
{
    try
    {
        const subjects = await pb.collection("books_subjects").getFullList({
            sort: "+subject",
            fields: "resource,subject,id",
        });
        BookSubjectsStore.set(subjects);  // Use set() to update the store
    } catch (err)
    {
        console.error("Error fetching subjects:", err);
    }
}
