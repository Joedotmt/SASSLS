<script>
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import { global, confirmationDialog } from "$lib/global.svelte.js";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { untrack } from "svelte";

    let { children } = $props();

    onMount(() => {
        global.fetchSubjects();
    });

    let env = $state({
        searchState: {
            query: "",
            subjects: [],
            levels: [],
            sortType: "created",
            sortAscending: true,
            idType: "both",
        },
        minimized: false,
        propogate_page: false,
        display_mode: "",
        selectedId: "",
        isLending: false,
        lend: () => {
            return;
        },
        setSelectedId: (id, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                env.selectedId = id;
                if (env.propogate_page) {
                    goto(`${base}/books${id ? "/#" : ""}${id}/${id ? env.display_mode : ""}`);
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
                env.display_mode = mode;
                if (env.propogate_page) {
                    goto(`${base}/books/#${env.selectedId}/${mode}`);
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
        if (window.location.hash) {
            untrack(() => {
                env.selectedId = page.params.id;
            });
        }
    });
    $effect(() => {
        //console.log(page.url.hash.substring(1, page.url.hash.length - 1));
        if (page.params.display_mode) {
            untrack(() => {
                env.display_mode = page.params.display_mode;
            });
        }
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <SearchPanel bind:env />
        <ListPanel bind:env collection="books" />
        <BookPanel bind:env />
    </div>
</div>
