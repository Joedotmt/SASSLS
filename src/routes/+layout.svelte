<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount, onDestroy } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import AccountDialog from "$lib/components/AccountDialog.svelte";

    let isDialogOpen = $state(false);

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    let observer;

    let barcode_string = "";

    onMount(() => {
        document.body.addEventListener("keydown", function (event) {
            barcode_string += event.key;
            if (barcode_string.length >= 8) {
                barcode_string = "";
            }
        });

        detectTouch();

        // Load fonts and update initial icons
        document.fonts.load('1rem "Material Symbols Outlined"').then(() => {
            updateSymbols();
        });

        // Set up a mutation observer to detect new elements with the 'symbol' class
        const config = { childList: true, subtree: true };

        observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                mutation.addedNodes.forEach((node) => {
                    if (
                        node.nodeType === 1 &&
                        node.classList.contains("symbol")
                    ) {
                        updateSymbol(node);
                    }
                });
            }
        });

        observer.observe(document.body, config);
    });

    onDestroy(() => {
        // Disconnect observer when component is destroyed
        if (observer) observer.disconnect();
    });

    function updateSymbols() {
        // Update all existing symbols
        document.querySelectorAll(".symbol").forEach((e) => {
            updateSymbol(e);
        });
    }

    function updateSymbol(element) {
        element.classList.add("material-symbols-outlined");
        element.classList.remove("symbol");
    }
let {children} = $props()
    import "../themes.css";
    import "../style.css";
</script>

<div
    style="position: fixed; z-index:2; right:50%; scale:0.3; opacity:0.3"
></div>

<TopBar on:accBtnPress={openDialog} />

<AccountDialog bind:isOpen={isDialogOpen} on:close={closeDialog} />

{@render children()}