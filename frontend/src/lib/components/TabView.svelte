<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script>
    let { currentTab = $bindable(0), content1, content2 } = $props();
    let oldCurrentTab = $state(currentTab);
    let currentTabReal = $state(currentTab);

    let direction = $state(1);
    let animating = $state(false);

    $effect(() => {
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
    });
</script>

<div id="container">
    <div class="tab-container {animating ? (direction === 1 ? 'slide-left' : 'slide-right') : ''}"></div>

    {#if currentTabReal == 0}{@render content1()}{/if}
    {#if currentTabReal == 1}{@render content2()}{/if}
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
