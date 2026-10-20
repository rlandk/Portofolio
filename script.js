// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    // Toggle hamburger menu
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scroll when menu is open
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking links
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better active state

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Parallax Effect
document.addEventListener('mousemove', parallax);

function parallax(e) {
    document.querySelectorAll('.parallax').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Form Validation and Submit
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData);
    
    // Add loading state to button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Project Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const overlay = card.querySelector('.project-overlay');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        overlay.style.transform = `scale(1.5)`;
        overlay.style.transformOrigin = `${x}px ${y}px`;
    });
    
    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.project-overlay');
        overlay.style.transform = 'scale(1)';
    });
});

// Skill Icons Animation
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.querySelector('i').style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.querySelector('i').style.transform = 'scale(1) rotate(0)';
    });
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.fade-in, .slide-in');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

// Throttle function to limit the number of scroll events
const throttle = (func, limit) => {
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
};

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

// Initial check for elements in view
handleScrollAnimation();

// Add animation class to elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}); 