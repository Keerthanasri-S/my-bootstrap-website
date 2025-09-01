// ===== MAIN JAVASCRIPT FOR 1UPCLOUD TECH WEBSITE =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECTS =====
    const navbar = document.querySelector('.template-navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional effect)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, #about h2, #about p');
    animateElements.forEach(el => observer.observe(el));
    
    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you! Your message has been sent.', 'success');
            this.reset();
        });
    }
    
    // ===== CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== UTILITY FUNCTIONS =====
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#3182ce'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    
    // Debounce scroll events
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
    
    // Optimize scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Scroll handling logic here
    }, 16); // ~60fps
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Add keyboard navigation for cards
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ===== MOBILE MENU ENHANCEMENTS =====
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Add smooth animation
            if (!isExpanded) {
                navbarCollapse.style.display = 'block';
                setTimeout(() => {
                    navbarCollapse.classList.add('show');
                }, 10);
            } else {
                navbarCollapse.classList.remove('show');
                setTimeout(() => {
                    navbarCollapse.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ===== INITIALIZATION COMPLETE =====
    console.log('1UpCloud Tech website initialized successfully!');
    
});

// ===== ADDITIONAL CSS FOR JAVASCRIPT FEATURES =====
const additionalStyles = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(49, 130, 206, 0.3);
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(49, 130, 206, 0.4);
    }
    
    .template-navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    
    .template-navbar {
        transition: all 0.3s ease;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .navbar-collapse {
        transition: all 0.3s ease;
    }
    
    .navbar-collapse.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 991.98px) {
        .navbar-collapse {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);