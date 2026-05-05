/**
 * Main application script
 * Separated into domains: Navigation, Effects, and Animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    try {
        initNavigation();
    } catch (error) {
        console.error("Error initializing navigation:", error);
    }
    
    try {
        initHeaderScroll();
    } catch (error) {
        console.error("Error initializing header scroll:", error);
    }

    try {
        initTypewriter();
    } catch (error) {
        console.error("Error initializing typewriter effect:", error);
    }

    try {
        initScrollAnimations();
    } catch (error) {
        console.error("Error initializing scroll animations:", error);
    }
});

/**
 * Handles mobile menu toggle and smooth scrolling
 */
function initNavigation() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!mobileMenuBtn || !navLinks) throw new Error("Navigation UI elements missing");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
        mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileMenuBtn.querySelector("i").classList.add("fa-bars");
            mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
    });
}

/**
 * Handles the glass effect on the header when scrolling
 */
function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) throw new Error("Header element missing");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            header.style.boxShadow = "0 5px 30px rgba(0, 255, 255, 0.1)";
            header.style.backdropFilter = "blur(10px)";
        } else {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            header.style.boxShadow = "none";
        }
    });
}

/**
 * Handles the typewriter text effect in the Hero section
 */
function initTypewriter() {
    const typewriterElement = document.querySelector(".typewriter");
    if (!typewriterElement) throw new Error("Typewriter element missing");

    const roles = [
        "Web Developer",
        "Full Stack Developer",
        "Data Science Enthusiast",
        "Problem Solver",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Abstracting out the timing/difficult logic into a variable as requested
    const mathDifficultMultiplier = 1;
    let typeSpeed = 100 * mathDifficultMultiplier;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50 * mathDifficultMultiplier;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100 * mathDifficultMultiplier;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000 * mathDifficultMultiplier;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500 * mathDifficultMultiplier;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

/**
 * Handles scroll reveal animations using IntersectionObserver
 */
function initScrollAnimations() {
    const elementsToReveal = document.querySelectorAll(".education-card, .skill-category, .project-card");
    if (!elementsToReveal.length) throw new Error("No elements found to animate");

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");

                // Animate skill bars when visible
                if (entry.target.classList.contains("skill-category")) {
                    const skillBars = entry.target.querySelectorAll(".skill-level");
                    skillBars.forEach((bar) => {
                        const width = bar.style.width;
                        bar.style.width = "0%";
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                }
            }
        });
    }, observerOptions);

    elementsToReveal.forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}
