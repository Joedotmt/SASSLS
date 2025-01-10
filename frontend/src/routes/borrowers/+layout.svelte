<script>
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import SearchPanel from "$lib/components/BorrowerSearchPanel.svelte";
    import BorrowerPanel from "$lib/components/display/BorrowerPanel.svelte";
    import { global, confirmationDialog } from "$lib/global.svelte.js";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { untrack } from "svelte";

    let { children } = $props();

    let env = $state({
        searchState: {
            query: "",
            sortType: "Created",
            group: "",
            sortAscending: true,
        },
        propogate_page: true,
        display_mode: "",
        selectedId: "",
        minimized: false,
        setSelectedId: (id, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                env.selectedId = id;
                if (env.propogate_page) {
                    goto(`${base}/borrowers${id ? "/" : ""}${id}/${id ? env.display_mode : ""}`);
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
                    goto(`${base}/borrowers/${env.selectedId}/${mode}`);
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
        untrack(() => {
            env.selectedId = page.params.id || "";
            env.display_mode = page.params.display_mode || "";
        });
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <SearchPanel bind:env />
        <ListPanel bind:env collection="borrowers" />
        <BorrowerPanel bind:env />
    </div>
</div>
