/**
 * Mesh Background Manager
 * Domain: Background DOM Injection
 * Purpose: Dynamically creates and injects the animated mesh gradient background.
 */

class MeshBackgroundManager {
    constructor() {
        this.init();
    }

    init() {
        try {
            // Create main container
            const container = document.createElement('div');
            container.className = 'mesh-background-container';

            // Create blobs
            const colors = ['cyan', 'magenta', 'purple'];
            
            colors.forEach(color => {
                const blob = document.createElement('div');
                blob.className = `mesh-blob ${color}`;
                container.appendChild(blob);
            });

            // Inject into DOM as first child of body to ensure it stays in background layer
            if (document.body) {
                document.body.insertBefore(container, document.body.firstChild);
                console.info("[MeshBackgroundManager] Animated background successfully injected.");
            } else {
                throw new Error("document.body is not available.");
            }
        } catch (error) {
            console.error("[MeshBackgroundManager] Failed to inject animated background.", error.message);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MeshBackgroundManager();
});
