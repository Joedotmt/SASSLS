<script>
    export let currentTab = 0;
    let oldCurrentTab = currentTab;
    let currentTabReal = currentTab;

    let direction = 1;
    let animating = false;

    $: {
        // Update direction only if currentTab changes
        if (currentTab !== oldCurrentTab) {
            direction = currentTab > oldCurrentTab ? 1 : -1;
            oldCurrentTab = currentTab; // Update oldCurrentTab after setting direction
            animating = true;

            setTimeout(() => {
                animating = false;
            }, 300); // Assuming the animation duration is 300ms
            setTimeout(() => {
                currentTabReal = currentTab;
            }, 300 / 2); // Assuming the animation duration is 300ms
        }
    }
</script>

<div id="container">
    <div
        class="tab-container {animating
            ? direction === 1
                ? 'slide-left'
                : 'slide-right'
            : ''}"
    >
        {#if currentTabReal === 0}<slot name="0"></slot>{/if}
        {#if currentTabReal === 1}<slot name="1"></slot>{/if}
        {#if currentTabReal === 2}<slot name="2"></slot>{/if}
        {#if currentTabReal === 3}<slot name="3"></slot>{/if}
        {#if currentTabReal === 4}<slot name="4"></slot>{/if}
        {#if currentTabReal === 5}<slot name="5"></slot>{/if}
        {#if currentTabReal === 6}<slot name="6"></slot>{/if}
        {#if currentTabReal === 7}<slot name="7"></slot>{/if}
        {#if currentTabReal === 8}<slot name="8"></slot>{/if}
        {#if currentTabReal === 9}<slot name="9"></slot>{/if}
        {#if currentTabReal === 10}<slot name="10"></slot>{/if}
    </div>
</div>

<style>
    .tab-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .slide-left {
        animation: slide-left 300ms cubic-bezier(0.43, 0.02, 0, 1);
    }

    .slide-right {
        animation: slide-right 300ms cubic-bezier(0.43, 0.02, 0, 1);
    }

    @keyframes slide-left {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        50% {
            transform: translateX(5px);
            opacity: 0;
        }
        51% {
            transform: translateX(-5px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-right {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        50% {
            transform: translateX(-5px);
            opacity: 0;
        }
        51% {
            transform: translateX(5px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
