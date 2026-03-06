/**
 * ============================================================================
 * PORTFÓLIO PROFISSIONAL - SCRIPT PRINCIPAL
 * Funcionalidades: Navbar, Parallax, Scroll Animations, Interatividade
 * Autor: Guilherme Augusto
 * ============================================================================
 * 
 * Estrutura:
 * 1. Inicialização e Seleção de Elementos
 * 2. Navbar - Scroll Effect & Mobile Menu
 * 3. Parallax Effect
 * 4. Scroll Animations (Reveal)
 * 5. Skill Bars Animation
 * 6. Navigation Active Link
 * 7. Smooth Scroll
 * 8. Utility Functions
 * ============================================================================
 */

// ============================================================================
// 1. INICIALIZAÇÃO E SELEÇÃO DE ELEMENTOS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Elementos do DOM
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const revealElements = document.querySelectorAll('.reveal-up');
    const skillFills = document.querySelectorAll('.skill-fill');
    const heroSection = document.querySelector('.hero');
    
    // Estado
    let isMenuOpen = false;
    let lastScrollY = 0;
    
    // ========================================================================
    // 2. NAVBAR - SCROLL EFFECT & MOBILE MENU
    // ========================================================================
    
    /**
     * Atualiza o estado da navbar ao fazer scroll
     * Adiciona classe 'scrolled' quando scroll > 10px
     */
    function updateNavbarOnScroll() {
        lastScrollY = window.scrollY;
        
        if (lastScrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    /**
     * Abre/fecha o menu mobile
     */
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);
    }
    
    /**
     * Fecha o menu mobile
     */
    function closeMobileMenu() {
        isMenuOpen = false;
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    /**
     * Event Listener: Clique no botão de menu
     */
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    /**
     * Event Listener: Clique em um link de navegação
     * Fecha o menu mobile em dispositivos pequenos
     */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    /**
     * Event Listener: Clique fora do menu
     * Fecha o menu mobile ao clicar fora dele
     */
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // ========================================================================
    // 3. PARALLAX EFFECT
    // ========================================================================
    
    /**
     * Cria efeito parallax no background
     * O fundo se move mais lentamente que o conteúdo
     */
    function updateParallax() {
        if (!heroSection) return;
        
        const scrollY = window.scrollY;
        const parallaxAmount = scrollY * 0.5;
        
        // Aplica transform ao body para criar efeito parallax
        document.body.style.backgroundPosition = `center ${-parallaxAmount}px`;
    }
    
    // ========================================================================
    // 4. SCROLL ANIMATIONS (REVEAL)
    // ========================================================================
    
    /**
     * Intersection Observer para animar elementos ao entrar na viewport
     * Usa a classe 'reveal-up' para aplicar animação
     */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento entrou na viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observa todos os elementos com classe reveal-up
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // ========================================================================
    // 5. SKILL BARS ANIMATION
    // ========================================================================
    
    /**
     * Intersection Observer para animar as barras de habilidade
     * Preenche a barra quando entra na viewport
     */
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const targetWidth = skillFill.getAttribute('data-width');
                
                // Anima a largura da barra
                skillFill.style.width = targetWidth;
                skillsObserver.unobserve(skillFill);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observa todas as barras de habilidade
    skillFills.forEach(fill => {
        skillsObserver.observe(fill);
    });
    
    // ========================================================================
    // 6. NAVIGATION ACTIVE LINK
    // ========================================================================
    
    /**
     * Intersection Observer para destacar o link de navegação ativo
     * Baseado na seção visível na viewport
     */
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adiciona classe 'active' ao link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: window.innerWidth <= 768 ? '-70px 0px 0px 0px' : '0px'
    });
    
    // Observa todas as seções
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    // ========================================================================
    // 7. SMOOTH SCROLL
    // ========================================================================
    
    /**
     * Smooth scroll para links internos (#)
     * Funciona com qualquer link que aponta para um ID
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora links vazios
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Calcula o offset (altura da navbar)
                const navbarHeight = navbar.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                if (isMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });
    
    // ========================================================================
    // 8. EVENT LISTENERS - SCROLL
    // ========================================================================
    
    /**
     * Event Listener: Scroll
     * Atualiza navbar, parallax e outras animações baseadas em scroll
     */
    window.addEventListener('scroll', () => {
        updateNavbarOnScroll();
        updateParallax();
    });
    
    /**
     * Event Listener: Resize
     * Atualiza o estado do menu ao redimensionar a janela
     */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // ========================================================================
    // 9. INICIALIZAÇÃO
    // ========================================================================
    
    // Inicializa a navbar com scroll inicial
    updateNavbarOnScroll();
    
    // Log de inicialização
    console.log('✨ Portfólio Profissional Carregado com Sucesso!');
    console.log('🚀 Animações, Parallax e Interatividade Ativadas');
});

// ============================================================================
// UTILITY FUNCTIONS (Funções Utilitárias)
// ============================================================================

/**
 * Detecta se o usuário prefere redução de movimento
 * Respeita as preferências de acessibilidade do sistema
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce - Reduz a frequência de chamadas de função
 * Útil para eventos como scroll e resize
 * 
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce aplicado
 */
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

/**
 * Throttle - Limita a frequência de chamadas de função
 * Garante que a função seja executada no máximo uma vez a cada X ms
 * 
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Intervalo mínimo em ms
 * @returns {Function} - Função com throttle aplicado
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Verifica se um elemento está visível na viewport
 * 
 * @param {Element} element - Elemento a verificar
 * @returns {boolean} - True se visível, false caso contrário
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/**
 * Adiciona classe a um elemento com delay
 * Útil para animações em cascata
 * 
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @param {number} delay - Delay em ms
 */
function addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Remove classe de um elemento com delay
 * 
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @param {number} delay - Delay em ms
 */
function removeClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

/**
 * Anima um valor numérico de um ponto a outro
 * Útil para contadores e valores animados
 * 
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duração em ms
 * @param {Function} callback - Função chamada a cada frame
 */
function animateValue(start, end, duration, callback) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        callback(Math.round(current));
    }, 16);
}

/**
 * Log customizado com estilo
 * Facilita debug no console
 * 
 * @param {string} message - Mensagem
 * @param {string} type - Tipo: 'info', 'success', 'warning', 'error'
 */
function logStyled(message, type = 'info') {
    const styles = {
        info: 'color: #00d4ff; font-weight: bold;',
        success: 'color: #7c4dff; font-weight: bold;',
        warning: 'color: #ffa500; font-weight: bold;',
        error: 'color: #ff6b6b; font-weight: bold;'
    };
    
    console.log(`%c${message}`, styles[type] || styles.info);
}
