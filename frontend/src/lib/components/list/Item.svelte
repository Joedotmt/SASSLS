<script>
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import { global } from "$lib/global.svelte.js";
    import { base } from "$app/paths";

    let { itemType, item, isSelected = $bindable(false), env = $bindable(), interactable = true } = $props();

    let IDL = $derived(itemType === "books" && item.legacy_book_id[0] != "_" ? item.legacy_book_id : "");
    let line_1 = $derived(itemType === "books" ? item.title : `${item.name} ${item.surname}`);
    let line_2 = $derived(itemType === "books" ? `by ${item.author}` : `${item.group}`);

    function getBorrowerImageGroup(group) {
        const imageGroups = {
            Teacher: base + "/borrower_image/figure_one_purple.png",
            Admin: base + "/borrower_image/figure_one_green.png",
            LSE: base + "/borrower_image/figure_one_red.png",
            Maintenance: base + "/borrower_image/figure_one_white.png",
        };
        return imageGroups[group] || base + "/borrower_image/figure_one_blue.png";
    }

    function handleClick() {
        if (!interactable) {
            return;
        }
        if (!isSelected) {
            global.loading_items.add(item.id);
        }
        env.setSelectedId(item.id);
        env.setDisplay_mode("");
    }
</script>

{#if item}
    <button class="list-button list-item {isSelected ? 'selected' : ''}" onclick={handleClick} style="view-transition-name: id-{item.id};">
        <img class="preview-image" src={itemType == "books" ? item.preview_url_override || global.getRandomBookCover(item.id) : getBorrowerImageGroup(item.group)} alt="item cover" />
        <div class="cont list-item-info-text">
            <div class="cont">
                <div style="text-align: left;">
                    <div>{line_1}</div>
                    <div>{line_2}</div>
                </div>
                <div class="id-div">
                    {#if IDL != ""}{IDL}<br />
                    {/if}{item.id}
                </div>
            </div>
        </div>
        {#if global.loading_items.has(item.id)}
            <div class="fade-in" style="position:absolute; bottom:0; left:0; width:calc(100% - 1em); margin:0em 0.5em">
                <LoadingBar />
            </div>
        {/if}
    </button>
{/if}

<style>
    .cont {
        font-family: var(--the-font);
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }
</style>
