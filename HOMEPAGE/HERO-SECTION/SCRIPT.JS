/* ============================================
   KING MENTALITY - HERO SECTION JAVASCRIPT (UPDATED)
   Interactive Functionality & User Experience
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSection();
});

// Main initialization function
function initializeHeroSection() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupNavigationEffects();
    setupLogoFallback();
    setupKeyboardNavigation();
    setupButtonEffects();
    setupCrisisStatsAnimation();
    setupQuoteAnimations();
    setupTabNavigation();
    setupCrisisReadMore();
}

/* ===== MOBILE MENU FUNCTIONALITY ===== */

function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    
    if (!mobileToggle || !mobileMenu) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
    
    const isOpen = mobileMenu.style.display === 'block';
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
    
    mobileMenu.style.display = 'block';
    mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Animate hamburger to X
    hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    hamburgerLines[1].style.opacity = '0';
    hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
    
    mobileMenu.style.display = 'none';
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Reset hamburger animation
    hamburgerLines[0].style.transform = 'none';
    hamburgerLines[1].style.opacity = '1';
    hamburgerLines[2].style.transform = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

/* ===== SMOOTH SCROLLING ===== */

function setupSmoothScrolling() {
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollToElement(targetElement);
            }
        });
    });
}

function smoothScrollToElement(element) {
    const navHeight = document.querySelector('.nav-container').offsetHeight;
    const elementPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

/* ===== NAVIGATION SCROLL EFFECTS ===== */

function setupNavigationEffects() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(updateNavigation);
            isScrolling = true;
        }
    });
    
    function updateNavigation() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            nav.classList.add('nav-scrolled');
            nav.style.background = 'rgba(13, 13, 13, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.2)';
        } else {
            nav.classList.remove('nav-scrolled');
            nav.style.background = 'rgba(13, 13, 13, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
}

/* ===== LOGO FALLBACK FUNCTIONALITY ===== */

function setupLogoFallback() {
    const logoImage = document.querySelector('.logo-image');
    const logoLink = document.querySelector('.logo');
    
    if (!logoImage || !logoLink) return;
    
    // Check if logo loads successfully
    logoImage.addEventListener('error', function() {
        // Hide the broken image
        this.style.display = 'none';
        
        // Show text fallback
        logoLink.innerHTML = '<span class="logo-text">KING MENTALITY</span>';
        
        // Apply text styling
        const logoText = logoLink.querySelector('.logo-text');
        if (logoText) {
            logoText.style.fontFamily = 'var(--font-royal)';
            logoText.style.fontSize = '1.5rem';
            logoText.style.fontWeight = 'var(--weight-bold)';
            logoText.style.color = 'var(--glowing-gold)';
            logoText.style.textShadow = 'var(--glow-gold)';
        }
    });
    
    // Add loading state
    logoImage.addEventListener('load', function() {
        this.style.opacity = '1';
    });
}

/* ===== KEYBOARD NAVIGATION ===== */

function setupKeyboardNavigation() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Handle tab navigation
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });
}

function handleTabNavigation(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const isMenuOpen = mobileMenu && mobileMenu.style.display === 'block';
    
    if (isMenuOpen) {
        const focusableElements = mobileMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Trap focus within mobile menu
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

/* ===== SCROLL INDICATOR ===== */

function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        // Scroll to next section (placeholder for when next section exists)
        const nextSection = document.querySelector('#awakening') || document.querySelector('section:nth-of-type(2)');
        if (nextSection) {
            smoothScrollToElement(nextSection);
        } else {
            // If no next section, scroll down one viewport height
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Hide scroll indicator when user starts scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

/* ===== BUTTON EFFECTS ===== */

function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // Add subtle hover sound effect preparation
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        // Add pulse effect for primary button
        if (button.classList.contains('btn-primary')) {
            setInterval(() => {
                if (!button.matches(':hover')) {
                    button.style.animation = 'pulse-gold 2s ease-in-out';
                    setTimeout(() => {
                        button.style.animation = 'none';
                    }, 2000);
                }
            }, 8000);
        }
    });
}

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* ===== CRISIS STATS ANIMATION ===== */

function setupCrisisStatsAnimation() {
    const statsSection = document.querySelector('.crisis-stats');
    const statNumbers = document.querySelectorAll('.stat-item.urgent .stat-number');
    let hasAnimated = false;
    
    // Create intersection observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCrisisStats();
                hasAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the stats section
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCrisisStats() {
    const statItems = document.querySelectorAll('.stat-item.urgent');
    
    statItems.forEach((item, index) => {
        setTimeout(() => {
            // Add urgent flash effect
            item.style.animation = 'urgentFlash 0.5s ease-in-out';
            
            // Add number glow effect
            const number = item.querySelector('.stat-number');
            if (number) {
                number.style.animation = 'redGlow 1s ease-in-out';
            }
        }, index * 200);
    });
}

/* ===== QUOTE ANIMATIONS ===== */

function setupQuoteAnimations() {
    const troyQuote = document.querySelector('.troy-quote');
    const buddhaQuote = document.querySelector('.buddha-quote');
    
    // Add typing effect to Troy quote
    if (troyQuote) {
        setTimeout(() => {
            troyQuote.style.animation = 'typewriter 2s steps(40) forwards';
        }, 1500);
    }
    
    // Add floating effect to Buddha quote
    if (buddhaQuote) {
        buddhaQuote.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        buddhaQuote.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

/* ===== UTILITY FUNCTIONS ===== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add visual feedback for crisis stats
function addUrgentFeedback() {
    const crisisSection = document.querySelector('.crisis-stats');
    if (crisisSection) {
        // Add pulsing border effect
        setInterval(() => {
            crisisSection.style.borderColor = 'var(--blood-red)';
            setTimeout(() => {
                crisisSection.style.borderColor = 'var(--deep-red)';
            }, 1000);
        }, 3000);
    }
}

/* ===== CSS ANIMATIONS (added via JavaScript) ===== */

// Add additional animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes urgentFlash {
        0%, 100% { 
            background: rgba(139, 0, 0, 0.2); 
        }
        50% { 
            background: rgba(139, 0, 0, 0.4); 
        }
    }
    
    @keyframes redGlow {
        0%, 100% { 
            text-shadow: 0 0 10px rgba(139, 0, 0, 0.5); 
        }
        50% { 
            text-shadow: 0 0 20px rgba(220, 20, 60, 0.8); 
        }
    }
    
    @keyframes pulse-gold {
        0%, 100% { 
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3); 
        }
        50% { 
            box-shadow: 0 6px 25px rgba(255, 215, 0, 0.6); 
        }
    }
    
    @keyframes typewriter {
        from { 
            border-right: 2px solid var(--deep-red); 
        }
        to { 
            border-right: 2px solid transparent; 
        }
    }
`;
document.head.appendChild(style);

/* ===== ADVANCED INTERACTIONS ===== */

// Add Easter egg - Konami code for special effect
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        triggerKingMode();
    }
});

function triggerKingMode() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'kingPulse 2s ease-in-out';
        heroTitle.style.textShadow = '0 0 30px var(--glowing-gold)';
        
        // Add crown emoji
        setTimeout(() => {
            heroTitle.innerHTML += ' 👑';
        }, 1000);
    }
}

/* ===== ERROR HANDLING ===== */

// Global error handler for this section
window.addEventListener('error', function(e) {
    console.warn('Hero Section Error:', e.message);
    // Fallback functionality can be added here
});

// Initialize urgent feedback
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addUrgentFeedback, 3000);
});

// Console log for successful initialization
console.log('👑 King Mentality Hero Section Initialized Successfully - All Systems Ready for Kingdom Building!');
