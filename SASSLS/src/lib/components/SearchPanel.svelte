<script>
    import FilterSelector from "$lib/components/FilterSelector.svelte";
    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import { onMount } from "svelte";
    import pb from "$lib/pocketbase";

    let subjectChips = [];
    export let extraPbFilters = "";

    export let searchPanelState = {
        selectedSubjects: [],
    };

    onMount(() => {
        fetchSubjects();
    });

    async function fetchSubjects() {
        try {
            const records = await pb.collection("books_subjects").getFullList({
                sort: "-created",
            });

            subjectChips = records.map((subject) => ({
                label: subject.subject,
                id: subject.id,
            }));
        } catch (err) {
            console.error("Error fetching subjects:", err);
        }
    }

    function filtersChanged(state) {
        if (state.selectedSubjects.length >= 1) {
            extraPbFilters = "";

            state.selectedSubjects.forEach((id) => {
                extraPbFilters += `subject='${id}'||`;
            });

            extraPbFilters = extraPbFilters.substring(
                0,
                extraPbFilters.length - 2,
            );
        } else {
            extraPbFilters = "";
        }
    }

    $: searchPanelState.selectedSubjects, filtersChanged(searchPanelState);
</script>

<div class="search-area panel">
    <Accordion>
        <span slot="head">Subjects</span>
        <ChipGroup
            bind:selectedIds={searchPanelState.selectedSubjects}
            slot="details"
            items={subjectChips}
        />
    </Accordion>
</div>
