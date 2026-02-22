/**
 * ============================================
 * AUTO MIND - JAVASCRIPT PRINCIPAL
 * Archivo: script.js
 * ============================================
 */

// ============================================
// CONFIGURACIÓN DE WOMPI
// ============================================


// ============================================
// ESPERAR A QUE WOMPI CARGUE
// ============================================
function waitForWompi(maxAttempts = 20) {
    return new Promise((resolve) => {
        let attempts = 0;
        const checkWompi = setInterval(() => {
            attempts++;
            console.log(`⏳ Esperando Wompi... intento ${attempts}/${maxAttempts}`);
            
            if (window.Wompi) {
                console.log('✅ Wompi cargado correctamente!');
                clearInterval(checkWompi);
                resolve(true);
            } else if (attempts >= maxAttempts) {
                console.error('❌ Wompi no cargó después de', maxAttempts * 0.5, 'segundos');
                clearInterval(checkWompi);
                resolve(false);
            }
        }, 500);
    });
}


const WOMPI_CONFIG = {
    publicKey: 'pub_test_DL4ffusD85Tg7JATLBFw6PxfoNLekvw4', 
    currency: 'COP',
    amountInCents: 75000000,
    customerId: 'customer_' + Date.now(),
    reference: 'PLAN_PRO_' + new Date().toISOString().slice(0,10),
    redirectUrl: window.location.href,
    metadata: {
        plan: 'PLAN_PRO',
        descripcion: 'Plan PRO - Automatización PYMES - Primer mes 50% OFF'
    }
};

// ============================================
// FUNCIÓN DE PAGO WOMPI
// ============================================
async function openWompiCheckout() {
    console.log('🔍 Iniciando checkout...');
    console.log('Public Key:', WOMPI_CONFIG.publicKey);
    
    // Esperar a que Wompi cargue
    const wompiLoaded = await waitForWompi();
    
    if (!wompiLoaded) {
        console.error('❌ Wompi no está disponible');
        alert('Error: El sistema de pagos no cargó. Recarga la página o intenta en unos segundos.');
        return;
    }
    
    if (WOMPI_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI' || !WOMPI_CONFIG.publicKey) {
        console.error('❌ Public Key no configurada correctamente');
        const modal = document.getElementById('paymentModal');
        if (modal) modal.classList.add('active');
        return;
    }

    try {
        console.log('✅ Abriendo checkout de Wompi...');
        console.log('Config:', {
            publicKey: WOMPI_CONFIG.publicKey,
            currency: WOMPI_CONFIG.currency,
            amountInCents: WOMPI_CONFIG.amountInCents,
            reference: WOMPI_CONFIG.reference
        });
        
        window.Wompi.openCheckout({
            publicKey: WOMPI_CONFIG.publicKey,
            currency: WOMPI_CONFIG.currency,
            amountInCents: WOMPI_CONFIG.amountInCents,
            reference: WOMPI_CONFIG.reference,
            customerId: WOMPI_CONFIG.customerId,
            redirectUrl: WOMPI_CONFIG.redirectUrl,
            metadata: WOMPI_CONFIG.metadata
        });
    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error al abrir el pago.');
    }
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.classList.remove('active');
}

// ============================================
// INICIALIZACIÓN DEL DOM (SOLO UNA VEZ)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- EVENT LISTENERS PARA MODAL ---
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtn = document.getElementById('closeModal');
    const goToWompiBtn = document.getElementById('goToWompi');
    const wompiButton = document.getElementById('wompiButton');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    if (goToWompiBtn) {
        goToWompiBtn.addEventListener('click', function() {
            window.open('https://wompi.co', '_blank'); // ✅ SIN ESPACIOS
        });
    }

    if (wompiButton) {
        wompiButton.addEventListener('click', openWompiCheckout);
    }

    // --- NAVEGACIÓN RESPONSIVE ---
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbar = document.getElementById('navbar');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }

    // --- EFECTO SCROLL EN NAVBAR ---
    window.addEventListener('scroll', function() {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // --- ANIMACIONES DE FEATURES ---
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            featureCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const items = this.querySelectorAll('.feature-list li');
            items.forEach((item, index) => {
                item.classList.remove('show');
                setTimeout(() => item.classList.add('show'), index * 100);
            });
        });
        const items = card.querySelectorAll('.feature-list li');
        items.forEach((item, index) => {
            setTimeout(() => item.classList.add('show'), index * 100);
        });
    });

    // --- WHATSAPP FLOAT ---
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappTooltip = document.getElementById('whatsappTooltip');

    setTimeout(() => {
        if (whatsappFloat) whatsappFloat.classList.add('show');
        setTimeout(() => {
            if (whatsappTooltip) {
                whatsappTooltip.classList.add('show');
                setTimeout(() => {
                    if (whatsappTooltip) whatsappTooltip.classList.remove('show');
                }, 5000);
            }
        }, 1000);
    }, 800);

    // --- SCROLL SUAVE PARA ANCLAS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && navbar) {
                const targetPosition = target.offsetTop - navbar.offsetHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- INTERSECTION OBSERVER PARA ANIMACIONES ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .roi-section, .payment-section, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // --- TRACKING DE ANALYTICS ---
    function trackEvent(eventName, eventData = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
            console.log('📊 Event tracked:', eventName, eventData);
        } else {
            console.warn('⚠️ Google Analytics no está cargado');
        }
    }

    document.querySelectorAll('.btn, .btn-wompi, .contact-link').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button: this.textContent.trim(),
                url: this.href || '#'
            });
        });
    });

    // --- DETECCIÓN DE DISPOSITIVO ---
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('mobile-device');
    }

    // --- LAZY LOADING PARA IMÁGENES ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // --- MENSAJE DE BIENVENIDA EN CONSOLA ---
    console.log('%c🤖 AutoMind - Automatización Inteligente', 'color: #2e7d32; font-size: 20px; font-weight: bold;');
    console.log('%c¿Interesado en trabajar con nosotros? ¡Contáctanos!', 'color: #ff6f00; font-size: 14px;');
    console.log('%cWhatsApp: +57 316 043 8031', 'color: #25D366; font-size: 14px;');
    
    if (WOMPI_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI') {
        console.warn('⚠️ Wompi: Debes configurar tu Public Key en script.js');
    } else {
        console.log('✅ Wompi: Public Key configurada correctamente');
    }
});

// ============================================
// FUNCIÓN GLOBAL PARA TRACKING PERSONALIZADO
// ============================================
window.trackCustomEvent = function(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
        console.log('📊 Custom event tracked:', eventName, eventData);
    } else {
        console.warn('⚠️ gtag no está disponible:', eventName, eventData);
    }
};


