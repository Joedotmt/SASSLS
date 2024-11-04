<script>
    import { createEventDispatcher } from "svelte";

    let { itemType, item, isSelected = $bindable() } = $props();

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("ItemClick", item.id);
    }

    function getBorrowerImageGroup(group) {
        const imageGroups = {
            Teacher: "figure_one_purple.png",
            Admin: "figure_one_green.png",
            LSE: "figure_one_red.png",
            Maintenance: "figure_one_white.png",
        };
        return imageGroups[group] || "figure_one_blue.png";
    }
</script>

<button
    class="list-button list-item {isSelected ? 'selected' : ''}"
    onclick={handleClick}
    style="view-transition-name: id-{item.id};"
>
    <img
        class="preview-image"
        src={itemType === "books"
            ? item.preview_url_override //||
            : //`https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`
              getBorrowerImageGroup(item.group)}
        alt={itemType === "books"
            ? `Cover of ${item.title}`
            : `${item.name} ${item.surname}`}
        style={itemType !== "books"
            ? "background: transparent; border: transparent; margin-right: 0.5em;"
            : ""}
    />
    <div class="cont list-item-info-text">
        <div class="cont">
            <div style="text-align: left;">
                {#if itemType === "books"}
                    <div>{item.title}</div>
                    <div>by {item.author}</div>
                {:else}
                    <div>{item.name} {item.surname}</div>
                    <div>{item.group}</div>
                {/if}
            </div>
            <div class="id-div">
                {#if itemType === "books"}
                    {#if item.legacy_book_id.match("DEPRECATED_")}
                        <div>{item.book_id}</div>
                    {:else}
                        <div>{item.legacy_book_id}</div>
                        <div>{item.book_id}</div>
                    {/if}
                {:else}
                    <div>{item.borrower_id}</div>
                {/if}
            </div>
        </div>
    </div>
</button>

<style>
    .cont {
        font-family: var(--the-font);
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
    }
</style>
