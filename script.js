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
            console.log('Formular-Daten:', formData);
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

    document.querySelectorAll('.menu-category, .info-card').forEach(card => {
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

        // Zum Aktivieren: Kommentar entfernen
        // const statusElement = document.createElement('div');
        // statusElement.textContent = isOpen ? '🟢 Geöffnet' : '🔴 Geschlossen';
        // document.body.appendChild(statusElement);
    }

    checkOpenStatus();

    console.log('%c Nazar Imbiss Website geladen!', 'color: #C85E3F; font-size: 16px; font-weight: bold;');
    console.log('Entwickelt mit Liebe für Nazar Imbiss Bad Godesberg');

});

// ==========================================
// Lazy Loading für Bilder
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Warenkorb
// ==========================================
(function() {
    let cart = [];

    const cartBtn     = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose   = document.getElementById('cart-close');
    const cartItemsEl = document.getElementById('cart-items');
    const cartCount   = document.getElementById('cart-count');
    const cartTotal   = document.getElementById('cart-total-price');

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    function addToCart(name, price) {
        const existing = cart.find(i => i.name === name);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ name, price: parseFloat(price), qty: 1 });
        }
        renderCart();
        openCart();
    }

    function changeQty(name, delta) {
        const item = cart.find(i => i.name === name);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
        renderCart();
    }

    function renderCart() {
        const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
        const count = cart.reduce((sum, i) => sum + i.qty, 0);

        cartCount.textContent = count;
        cartTotal.textContent = total.toFixed(2).replace('.', ',') + ' €';

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p class="cart-empty">Ihr Warenkorb ist leer.</p>';
            return;
        }

        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" data-name="${item.name}" data-delta="-1">−</button>
                    <span class="cart-qty">${item.qty}</span>
                    <button class="cart-qty-btn" data-name="${item.name}" data-delta="1">+</button>
                </div>
                <div class="cart-item-price">${(item.price * item.qty).toFixed(2).replace('.', ',')} €</div>
            </div>
        `).join('');

        cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                changeQty(btn.dataset.name, parseInt(btn.dataset.delta));
            });
        });
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(btn.dataset.name, btn.dataset.price);
        });
    });

    document.querySelector('.cart-order-btn').addEventListener('click', () => {
        if (cart.length === 0) return;
        alert('Vielen Dank für Ihre Bestellung! Wir bereiten alles vor.');
        cart = [];
        renderCart();
        closeCart();
    });
})();
// ==========================================
// Cookie Banner Funktionalität
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('nazar_cookie_consent');

    if (!cookieChoice) {
        // Show banner with a subtle delay for better UX
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