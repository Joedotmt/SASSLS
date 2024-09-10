<!--<script>
    let filters = ["Subject", "Level", "Location"];
    let subjects = ["Computing", "Maths", "Fiction"];
</script>

{#each filters as filter}
    <button
        style="padding: 1em; display: flex; justify-content: space-between;"
        class="list-button"
    >
        {filter}
        <span style="margin-left: 1em;" class="material-symbols-outlined">
            arrow_right
        </span>
    </button>
{/each}

{#each subjects as subject}
    <button
        style="padding: 1em; display: flex; justify-content: space-between;"
        class="list-button"
    >
        {subject}
    </button>
{/each}-->

<div class="main">
    <h1 style="margin-top:0; font-size: 1.5em">Create filter rule</h1>
    <div class="words">
        Book's<select>
            <option>Subject</option>
            <option>Color</option>
        </select>
        <select style="width: max-content;">
            <option>=</option>
            <option>!=</option>
        </select>
        <select>
            <option>Computing</option>
            <option>Drama</option>
            <option>Malti RES</option>
        </select>
    </div>
    <button
        style="margin-top: 1.5em; margin-left:auto; width: 8em;"
        class="dialog-button-accept">Add</button
    >
</div>

<style>
    select {
        width: 10em;
        font-size: 1em;
    }
    .words {
        display: flex;
        width: max-content;
        align-items: center;
        gap: 1em;
    }
    .main {
        padding: 2em;
    }
</style>
