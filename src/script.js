// script.js

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add active state to current page in navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath.includes('/about') && link.getAttribute('href') === '/about')) {
            link.classList.add('active');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Mobile menu toggle (for future enhancement)
    const setupMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');

        // Check if we're on mobile
        if (window.innerWidth <= 768) {
            // Mobile menu functionality can be added here if needed
            console.log('Mobile view detected');
        }
    };

    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // Parallax effect removed - hero image should stay static

    // Add hover effect sound or visual feedback (optional enhancement)
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';

            // Add rainbow animation to CSS if not already present
            if (!document.querySelector('#rainbow-style')) {
                const style = document.createElement('style');
                style.id = 'rainbow-style';
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Log page load for analytics (replace with actual analytics if needed)
    console.log('Geeky Blinders page loaded:', {
        page: currentPath,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
});
