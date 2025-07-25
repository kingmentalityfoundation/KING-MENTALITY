// ============================================
// KING MENTALITY - MOBILE JAVASCRIPT
// ============================================

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeTouchInteractions();
    initializeScrollAnimations();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('show');
                this.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                hamburgerLines.forEach((line, index) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            } else {
                // Open menu
                mobileMenu.classList.add('show');
                this.setAttribute('aria-expanded', 'true');
                
                // Animate hamburger to X
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.mobile-nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                hamburgerLines.forEach((line, index) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileToggle.contains(event.target) || mobileMenu.contains(event.target);
            
            if (!isClickInsideNav && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                hamburgerLines.forEach((line, index) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            }
        });
    }
}

// Touch Interactions for Cards
function initializeTouchInteractions() {
    const mobileCards = document.querySelectorAll('.mobile-card');
    
    mobileCards.forEach(card => {
        // Add touch feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
    
    // Add touch feedback to logo
    const logo = document.querySelector('.mobile-logo');
    if (logo) {
        logo.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        logo.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Scroll-based Animations
function initializeScrollAnimations() {
    // Simple scroll reveal for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.mobile-card, .mobile-crisis-stats');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Prevent zoom on double tap for better UX
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
