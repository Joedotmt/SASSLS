<script>
    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import SortButton from "$lib/components/SortButton.svelte";
    import TabSelector from "$lib/components/TabSelector.svelte";
    import TabView from "$lib/components/TabView.svelte";
    import { onMount } from "svelte";
    import pb from "$lib/pocketbase";
    import { BookLevelsStore } from "$lib/levels.js";
    let subjectChips = [];
    let levelChips = $BookLevelsStore;
    let resourceSubjectChips = [];

    export let searchPanelState = {
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "",
        sort: ["-", "created"],
    };

    onMount(() => {
        fetchSubjects();
    });

    async function fetchSubjects() {
        try {
            const records = await pb.collection("books_subjects").getFullList({
                sort: "+subject",
            });

            subjectChips = records
                .filter((subject) => !subject.subject.endsWith("RES"))
                .map((subject) => ({
                    label: subject.subject,
                    id: subject.id,
                }));

            resourceSubjectChips = records
                .filter((subject) => subject.subject.endsWith("RES"))
                .map((subject) => ({
                    label: subject.subject.slice(0, -3), // Remove 'RES' from the end
                    id: subject.id,
                }));
        } catch (err) {
            console.error("Error fetching subjects:", err);
        }
    }

    let currentTab = 0;
</script>

<div class="search-area panel">
    <Accordion expandedHeight={155} overflowy="none">
        <span slot="head">Sort by</span>
        <div
            style="flex-direction: row; display:flex; justify-content: space-between;"
            slot="details"
        >
            <ChipGroup
                bind:selectedIds={searchPanelState.sort[1]}
                multiple={false}
                optional={false}
                defaultId={"created"}
                style="width: fit-content"
                items={[
                    { id: "created", label: "Created" },
                    { id: "updated", label: "Updated" },
                    { id: "title", label: "Title" },
                    { id: "price", label: "Price" },
                ]}
            />
            <SortButton
                bind:value={searchPanelState.sort[0]}
                style="margin:0.5em; width:100px"
            />
        </div>
    </Accordion>
    <Accordion expandedHeight={400}>
        <span slot="head">Subjects</span>
        <div slot="details">
            <TabSelector bind:currentTab />
            <TabView bind:currentTab>
                <ChipGroup
                    slot="0"
                    bind:selectedIds={searchPanelState.selectedSubjects}
                    items={subjectChips}
                />
                <ChipGroup
                    slot="1"
                    bind:selectedIds={searchPanelState.selectedSubjects}
                    items={resourceSubjectChips}
                />
            </TabView>
        </div>
    </Accordion>
    <Accordion expandedHeight={192}>
        <span slot="head">Level</span>
        <div slot="details">
            <ChipGroup
                bind:selectedIds={searchPanelState.selectedLevels}
                items={levelChips}
            />
        </div>
    </Accordion>
    <select style="width: 100%;" bind:value={searchPanelState.showingIdType}>
        <option value="both">Both</option>
        <option value="old">Old ID</option>
        <option value="new">New ID</option>
    </select>
</div>
