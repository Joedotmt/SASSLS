<script>
    import { createEventDispatcher } from "svelte";

    export let itemType;
    export let item;
    export let isSelected;

    const dispatch = createEventDispatcher();

    function handleClick() {
        isSelected = true;
        dispatch("ItemClick", { id: item.id });
    }

    function getBorrowerImageGroup(group) {
        // Implement your getBorrowerImageGroup logic here
        return `path/to/${group}-image.jpg`;
    }
</script>

<button
    class="list-button list-item {isSelected ? 'selected' : ''}"
    on:click={handleClick}
    style="view-transition-name: id-{item.id};"
>
    <img
        class="preview-image"
        src={itemType === "books"
            ? item.preview_url_override ||
              `https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`
            : getBorrowerImageGroup(item.group)}
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
                <div>{item.title}</div>
                <div>by {item.author}</div>
            </div>
            <div class="id-div">
                {#if item.legacy_book_id.match("DEPRECATED_")}
                    <div>{item.book_id}</div>
                {:else}
                    <div>{item.legacy_book_id}</div>
                    <div>{item.book_id}</div>
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
