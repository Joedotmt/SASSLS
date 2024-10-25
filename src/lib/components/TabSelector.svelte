<script>
    
    /**
     * @typedef {Object} Props
     * @property {any} [tabs] - Define tabs
     * @property {number} [currentTab]
     * @property {string} [style]
     */

    /** @type {Props} */
    let { tabs = ["Subjects", "Resources"], currentTab = $bindable(0), style = "" } = $props();

    // Function to change the active tab
    function setActive(index) {
        currentTab = index;
    }
</script>

<div {style} class="tab-container">
    <div class="tabs">
        {#each tabs as tab, index}
            <button
                class="tab {currentTab === index ? 'selected' : ''}"
                onclick={() => setActive(index)}
            >
                {tab}
            </button>
        {/each}
    </div>
    <div
        class="active-indicator"
        style="width:{(1 / tabs.length) *
            100}%; transform: translateX({currentTab * 100}%);"
></div>
</div>

<style>
    .tab-container {
        position: relative; /* Needed for absolute positioning of the active indicator */
        width: 100%; /* Ensure the container is full width */
    }

    .tabs {
        display: flex; /* Align tabs horizontally */
        width: 100%;
    }

    .tab {
        background-color: var(---surface-5); /* Background color for tabs */
        opacity: 0.8;
        width: 50%; /* Each tab takes half the width */
        display: flex;
        justify-content: center;
        border: none;
        border-radius: 0;
        padding: 0.6em;
        cursor: pointer;
        position: relative; /* Needed for the indicator to be positioned absolutely */
        transition: 0.1s; /* Smooth background transition */
    }
    .tab.selected {
        background-color: color-mix(
            in hsl,
            var(---primary),
            var(---surface-5) 98%
        );
    }
    .tab.selected:hover {
        background-color: color-mix(
            in hsl,
            var(---primary),
            var(---surface-4) 98%
        );
    }
    .tab:hover {
        background: var(---surface-4);
    }

    .active-indicator {
        z-index: 1;
        position: absolute;
        bottom: 0; /* Position at the bottom of the tab */
        height: 2px; /* Height of the active indicator */
        background-color: var(---primary); /* Color of the indicator */
        width: 50%; /* Same width as each tab */
        transition: transform 0.3s cubic-bezier(0.3, 0.02, 0, 0.98); /* Smooth transition effect */
    }
</style>
