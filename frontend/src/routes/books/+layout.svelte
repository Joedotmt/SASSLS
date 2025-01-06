<script>
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import { global, confirmationDialog } from "$lib/global.svelte.js";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    onMount(() => {
        global.fetchSubjects();
    });

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { untrack } from "svelte";

    let pageParams = $state({
        searchState: {
            query: "",
            subjects: [],
            levels: [],
            sortType: "created",
            sortAscending: true,
            idType: "both",
        },
        minimized: false,
        propogate_page: true,
        display_mode: "",
        selectedId: "",
        isLending: false,
        lend: () => {
            return;
        },
        setSelectedId: (id, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                pageParams.selectedId = id;
                if (pageParams.propogate_page) {
                    goto(`${base}/books${id ? "/" : ""}${id}/${id ? pageParams.display_mode : ""}`);
                }
            };

            if (!global.unsaved_changes || skip_confirmation) {
                navigate();
                return;
            }

            confirmationDialog.dialog.showModal();
            confirmationDialog.confirm = navigate;
        },
        setDisplay_mode: (mode, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                pageParams.display_mode = mode;
                if (pageParams.propogate_page) {
                    goto(`${base}/books/${pageParams.selectedId}/${mode}`);
                }
            };

            if (!global.unsaved_changes || skip_confirmation) {
                navigate();
                return;
            }

            confirmationDialog.dialog.showModal();
            confirmationDialog.confirm = navigate;
        },
    });
    $effect(() => {
        if (page.params.id) {
            untrack(() => {
                pageParams.selectedId = page.params.id;
            });
        }
    });
    $effect(() => {
        if (page.params.display_mode) {
            untrack(() => {
                pageParams.display_mode = page.params.display_mode;
            });
        }
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <SearchPanel bind:pageParams />
        <ListPanel bind:pageParams collection="books" />
        <BookPanel bind:pageParams />
    </div>
</div>
