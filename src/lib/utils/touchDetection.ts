export function detectTouch() {
    if (typeof window === 'undefined') return;

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function watchForHover() {
        let lastTouchTime = 0;

        function enableHover() {
            if (new Date().getTime() - lastTouchTime < 500) return;
            document.body.classList.add('hasHover');
        }

        function disableHover() {
            document.body.classList.remove('hasHover');
        }

        function updateLastTouchTime() {
            lastTouchTime = new Date().getTime();
        }

        document.addEventListener('touchstart', updateLastTouchTime, true);
        document.addEventListener('touchstart', disableHover, true);
        document.addEventListener('mousemove', enableHover, true);

        enableHover();
    }

    if (!isTouchDevice()) {
        document.documentElement.classList.add('no-touch');
    }

    watchForHover();
}