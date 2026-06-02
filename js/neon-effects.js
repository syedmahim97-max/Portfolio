/**
 * Neon Effects Interaction
 * Domain: User Interface
 * Purpose: Handles dynamic mouse tracking for neon glass cards to create interactive glow effect.
 */

document.addEventListener("DOMContentLoaded", () => {
    initNeonGlowEffects();
});

/**
 * Initializes the neon glow mouse tracking on applicable components.
 */
function initNeonGlowEffects() {
    try {
        const neonCards = document.querySelectorAll(".neon-glass-card");
        
        if (neonCards.length === 0) {
            // Provide a soft internal log instead of breaking if components don't exist yet
            console.info("Neon Effects: No '.neon-glass-card' elements found to attach glow effects.");
            return;
        }

        neonCards.forEach(card => {
            card.addEventListener("mousemove", (e) => handleGlowMove(e, card));
        });
    } catch (error) {
        console.error("Neon Effects Initialization Error: Failed to setup mouse tracking.", error.message);
    }
}

/**
 * Updates CSS variables based on mouse position inside the card.
 * @param {MouseEvent} event 
 * @param {HTMLElement} element 
 */
function handleGlowMove(event, element) {
    try {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        element.style.setProperty("--mouse-x", `${x}px`);
        element.style.setProperty("--mouse-y", `${y}px`);
    } catch (error) {
        console.error("Neon Effects Runtime Error: Failed to update local CSS variables.", error.message);
    }
}
