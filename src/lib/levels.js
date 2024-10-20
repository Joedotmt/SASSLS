import { readable } from 'svelte/store';

// global object with read-only data
const BookLevels = [
    { label: "Brown", id: "Brown" },
    { label: "Yellow", id: "Yellow" },
    { label: "Blue", id: "Blue" },
    { label: "Green", id: "Green" },
    { label: "Red", id: "Red" },
];

export const BookLevelsStore = readable(BookLevels);
