// ==========================================
// Nazar Imbiss - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // Smooth Scrolling für Navigation
    // ==========================================
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // Aktive Navigation beim Scrollen
    // ==========================================
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // Navigation ausblenden beim Runterscrollen
    // ==========================================
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // ==========================================
    // Kontaktformular Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            if (!formData.name || !formData.email || !formData.message) {
                showMessage('Bitte füllen Sie alle erforderlichen Felder aus.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }

            showMessage('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.', 'success');
            contactForm.reset();
        });
    }

    function showMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '600';

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '2px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '2px solid #f5c6cb';
        }

        contactForm.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.5s ease';
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }

    // ==========================================
    // Scroll-Animationen
    // ==========================================
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.about-card, .award-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ==========================================
    // Öffnungsstatus prüfen
    // ==========================================
    function checkOpenStatus() {
        const now = new Date();
        const day = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        let isOpen = false;

        if (day >= 1 && day <= 5) {
            isOpen = currentTime >= 11 * 60 && currentTime < 22 * 60;
        } else if (day === 6) {
            isOpen = currentTime >= 11 * 60 && currentTime < 23 * 60;
        } else if (day === 0) {
            isOpen = currentTime >= 12 * 60 && currentTime < 22 * 60;
        }

        const statusBadge = document.createElement('div');
        statusBadge.style.cssText = `
            position: fixed;
            bottom: 1.5rem;
            left: 1.5rem;
            background: ${isOpen ? '#28a745' : '#dc3545'};
            color: white;
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 999;
            font-family: 'Lora', serif;
        `;
        statusBadge.textContent = isOpen ? '🟢 Jetzt geöffnet' : '🔴 Aktuell geschlossen';
        document.body.appendChild(statusBadge);
    }

    checkOpenStatus();

    console.log('%c Nazar Imbiss Website geladen!', 'color: #C85E3F; font-size: 16px; font-weight: bold;');
});

// ==========================================
// Cookie Banner Funktionalität
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    const cookieChoice = localStorage.getItem('nazar_cookie_consent');

    if (!cookieChoice) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('nazar_cookie_consent', 'accepted');
        hideBanner();
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('nazar_cookie_consent', 'declined');
        hideBanner();
    });

    function hideBanner() {
        cookieBanner.classList.remove('show');
    }
});
