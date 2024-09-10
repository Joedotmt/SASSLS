<script>
    function createRipple(event) {
        const button = event.currentTargetJoe;
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add("ripple");

        button.appendChild(ripple);

        // Force a reflow before adding the animate class
        ripple.offsetWidth;

        ripple.classList.add("animate");

        // Remove the ripple element after the animation
        setTimeout(() => {
            ripple.remove();
        }, 600); // Match this to your transition duration
    }
</script>

<button on:click={createRipple}></button>
