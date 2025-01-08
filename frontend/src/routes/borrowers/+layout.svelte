<script>
    import ListPanel from "$lib/components/list/ListPanel.svelte";
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
            sortType: "created",
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
                    goto(`${base}/borrowers${id ? "/#" : ""}${id}/${id ? env.display_mode : ""}`);
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
                    goto(`${base}/borrowers/#${env.selectedId}/${mode}`);
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
        const hashParams = page.url.hash.slice(1).split("/");
        untrack(() => {
            env.selectedId = hashParams[0];
            env.display_mode = hashParams[1];
        });
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <ListPanel bind:env collection="borrowers" />
        <BorrowerPanel bind:env />
    </div>
</div>
