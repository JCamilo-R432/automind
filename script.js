/**
 * ============================================
 * AUTO MIND - JAVASCRIPT PRINCIPAL
 * Archivo: script.js
 * ============================================
 */

// ============================================
// CONFIGURACIÓN DE WOMPI
// ============================================
const WOMPI_CONFIG = {
    publicKey: 'pub_test_DL4ffusD85Tg7JATLBFw6PxfoNLekvw4', 
    currency: 'COP',
    amountInCents: 75000000, // $750.000 COP en centavos
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
// ============================================
// FUNCIÓN DE PAGO WOMPI (CORREGIDA)
// ============================================
function openWompiCheckout() {
    console.log('🔍 Iniciando checkout de Wompi...');
    console.log('Public Key:', WOMPI_CONFIG.publicKey);
    
    // Validar si la key está configurada correctamente
    if (WOMPI_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI' || !WOMPI_CONFIG.publicKey) {
        console.error('❌ Public Key no configurada');
        const modal = document.getElementById('paymentModal');
        if (modal) modal.classList.add('active');
        return;
    }

    // Validar que Wompi esté cargado
    if (!window.Wompi) {
        console.error('❌ Wompi widget no está cargado en window.Wompi');
        alert('Cargando sistema de pagos... Espera 5 segundos y recarga la página.');
        return;
    }

    // Validar parámetros
    console.log('📦 Parámetros a enviar:', {
        publicKey: WOMPI_CONFIG.publicKey,
        currency: WOMPI_CONFIG.currency,
        amountInCents: WOMPI_CONFIG.amountInCents,
        reference: WOMPI_CONFIG.reference
    });

    // Abrir checkout de Wompi
    try {
        window.Wompi.openCheckout({
            publicKey: WOMPI_CONFIG.publicKey,
            currency: WOMPI_CONFIG.currency,
            amountInCents: WOMPI_CONFIG.amountInCents,
            reference: WOMPI_CONFIG.reference,
            customerId: WOMPI_CONFIG.customerId,
            redirectUrl: WOMPI_CONFIG.redirectUrl,
            metadata: WOMPI_CONFIG.metadata
        });
        console.log('✅ Checkout abierto correctamente');
    } catch (error) {
        console.error('❌ Error al abrir Wompi:', error);
        alert('Error al procesar el pago. Intenta nuevamente.');
    }
}

function closeModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// ============================================
// INICIALIZACIÓN DEL DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // EVENT LISTENERS PARA MODAL
    // ============================================
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtn = document.getElementById('closeModal');
    const goToWompiBtn = document.getElementById('goToWompi');
    const wompiButton = document.getElementById('wompiButton');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    if (goToWompiBtn) {
        goToWompiBtn.addEventListener('click', function() {
            window.open('https://wompi.co', '_blank');
        });
    }

    if (wompiButton) {
        wompiButton.addEventListener('click', openWompiCheckout);
    }

    // ============================================
    // NAVEGACIÓN RESPONSIVE
    // ============================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbar = document.getElementById('navbar');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Efecto scroll en navbar
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ============================================
    // ANIMACIONES DE FEATURES
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover active de todos
            featureCards.forEach(c => c.classList.remove('active'));
            // Agregar active al actual
            this.classList.add('active');
            
            // Animar lista items
            const items = this.querySelectorAll('.feature-list li');
            items.forEach((item, index) => {
                item.classList.remove('show');
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        });

        // Trigger inicial
        const items = card.querySelectorAll('.feature-list li');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    });

    // ============================================
    // WHATSAPP FLOAT
    // ============================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappTooltip = document.getElementById('whatsappTooltip');

    setTimeout(() => {
        if (whatsappFloat) {
            whatsappFloat.classList.add('show');
        }
        
        setTimeout(() => {
            if (whatsappTooltip) {
                whatsappTooltip.classList.add('show');
                
                setTimeout(() => {
                    if (whatsappTooltip) {
                        whatsappTooltip.classList.remove('show');
                    }
                }, 5000);
            }
        }, 1000);
    }, 800);

    // ============================================
    // SCROLL SUAVE PARA ANCLAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && navbar) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER PARA ANIMACIONES
    // ============================================
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

    // Observar elementos para animar
    document.querySelectorAll('.feature-card, .roi-section, .payment-section, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ============================================
    // TRACKING DE ANALYTICS (Opcional)
    // ============================================
    function trackEvent(eventName, eventData = {}) {
        console.log('📊 Event tracked:', eventName, eventData);
        // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
        // gtag('event', eventName, eventData);
    }

    // Track clicks en botones
    document.querySelectorAll('.btn, .btn-wompi, .contact-link').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button: this.textContent.trim(),
                url: this.href || '#'
            });
        });
    });

    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        document.body.classList.add('mobile-device');
    }

    // ============================================
    // LAZY LOADING PARA IMÁGENES (si las agregas)
    // ============================================
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

    // ============================================
    // MENSAJE DE BIENVENIDA EN CONSOLA
    // ============================================
    console.log('%c🤖 AutoMind - Automatización Inteligente', 'color: #2e7d32; font-size: 20px; font-weight: bold;');
    console.log('%c¿Interesado en trabajar con nosotros? ¡Contáctanos!', 'color: #ff6f00; font-size: 14px;');
    console.log('%cWhatsApp: +57 316 043 8031', 'color: #25D366; font-size: 14px;');
});


// ============================================
// FUNCIÓN DE PAGO WOMPI
// ============================================
function openWompiCheckout() {
    console.log('🔍 Iniciando checkout...');
    console.log('Public Key:', WOMPI_CONFIG.publicKey);
    
    // ✅ VALIDACIÓN CORRECTA: Si es el placeholder → mostrar modal
    if (WOMPI_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI' || !WOMPI_CONFIG.publicKey) {
        console.error('❌ Public Key no configurada correctamente');
        const modal = document.getElementById('paymentModal');
        if (modal) modal.classList.add('active');
        return;
    }

    // ✅ Si llegamos aquí, la key es válida → abrir Wompi
    if (!window.Wompi) {
        console.error('❌ Wompi no está cargado');
        alert('Cargando sistema de pagos... Recarga la página.');
        return;
    }

    try {
        console.log('✅ Abriendo checkout de Wompi...');
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
    document.getElementById('paymentModal').classList.remove('active');
}

// ============================================
// INICIALIZACIÓN DEL DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // EVENT LISTENERS PARA MODAL
    // ============================================
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtn = document.getElementById('closeModal');
    const goToWompiBtn = document.getElementById('goToWompi');
    const wompiButton = document.getElementById('wompiButton');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    if (goToWompiBtn) {
        goToWompiBtn.addEventListener('click', function() {
            window.open('https://wompi.co', '_blank');
        });
    }

    if (wompiButton) {
        wompiButton.addEventListener('click', openWompiCheckout);
    }

    // ============================================
    // NAVEGACIÓN RESPONSIVE
    // ============================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbar = document.getElementById('navbar');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Efecto scroll en navbar
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ============================================
    // ANIMACIONES DE FEATURES
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover active de todos
            featureCards.forEach(c => c.classList.remove('active'));
            // Agregar active al actual
            this.classList.add('active');
            
            // Animar lista items
            const items = this.querySelectorAll('.feature-list li');
            items.forEach((item, index) => {
                item.classList.remove('show');
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        });

        // Trigger inicial
        const items = card.querySelectorAll('.feature-list li');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    });

    // ============================================
    // WHATSAPP FLOAT
    // ============================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappTooltip = document.getElementById('whatsappTooltip');

    setTimeout(() => {
        if (whatsappFloat) {
            whatsappFloat.classList.add('show');
        }
        
        setTimeout(() => {
            if (whatsappTooltip) {
                whatsappTooltip.classList.add('show');
                
                setTimeout(() => {
                    if (whatsappTooltip) {
                        whatsappTooltip.classList.remove('show');
                    }
                }, 5000);
            }
        }, 1000);
    }, 800);

    // ============================================
    // SCROLL SUAVE PARA ANCLAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && navbar) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER PARA ANIMACIONES
    // ============================================
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

    // Observar elementos para animar
    document.querySelectorAll('.feature-card, .roi-section, .payment-section, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ============================================
    // TRACKING DE ANALYTICS
    // ============================================
    function trackEvent(eventName, eventData = {}) {
        // Verificar si Google Analytics está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
            console.log('📊 Event tracked:', eventName, eventData);
        } else {
            console.warn('⚠️ Google Analytics no está cargado');
        }
    }

    // Track clicks en botones
    document.querySelectorAll('.btn, .btn-wompi, .contact-link').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button: this.textContent.trim(),
                url: this.href || '#'
            });
        });
    });

    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        document.body.classList.add('mobile-device');
    }

    // ============================================
    // LAZY LOADING PARA IMÁGENES
    // ============================================
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

    // ============================================
    // MENSAJE DE BIENVENIDA EN CONSOLA
    // ============================================
    console.log('%c🤖 AutoMind - Automatización Inteligente', 'color: #2e7d32; font-size: 20px; font-weight: bold;');
    console.log('%c¿Interesado en trabajar con nosotros? ¡Contáctanos!', 'color: #ff6f00; font-size: 14px;');
    console.log('%cWhatsApp: +57 316 043 8031', 'color: #25D366; font-size: 14px;');
    
    // Verificar si Wompi está configurado
    if (WOMPI_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI') {
        console.warn('⚠️ Wompi: Debes configurar tu Public Key en js/app.js');
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

