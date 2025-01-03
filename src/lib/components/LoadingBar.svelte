<div class="loading-bar">
    <div></div>
    <div></div>
    <div></div>
</div>

<style>
    .loading-bar {
        height: 5px;
        display: flex;
        border-radius: 500px;
        overflow: hidden;
        width: 100%;
        pointer-events: none;
        flex-direction: row;
    }

    .loading-bar > div {
        height: 100%;
        border-radius: 500px;
        flex-shrink: 0;
        width: 100%;
    }

    .loading-bar > div:first-child {
        background-color: var(---primary);
        opacity: 0.3;
        animation: loading-bar-anim-left 1s cubic-bezier(1, 0, 0.31, 1) infinite;
    }

    .loading-bar > div:nth-child(2) {
        margin: 0 10px;
        background-color: var(---primary);
        animation: loading-bar-anim-width 1s cubic-bezier(1, 0, 0.31, 1) infinite;
    }

    .loading-bar > div:last-child {
        opacity: 0.3;
        background-color: var(---primary);
    }

    @keyframes loading-bar-anim-left {
        0% {
            width: 0px;
        }

        100% {
            width: 100%;
        }
    }

    @keyframes loading-bar-anim-width {
        0% {
            width: 0px;
            margin: 0 5px;
            margin-left: -5px;
        }

        30% {
            margin-left: 5px;
        }

        70% {
            width: 50%;
        }

        100% {
            width: 10px;
        }
    }
</style>
