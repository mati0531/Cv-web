const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

/* LUZ QUE SIGUE AL MOUSE, SOLO DENTRO DEL HERO */

const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero .glow');

if (hero && heroGlow) {

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        heroGlow.style.transform = `translate(-50%, -50%) translate(${glowX}px, ${glowY}px)`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

}

const menuToggle = document.querySelector('.menu-toggle');
const menuPrincipal = document.querySelector('#menu-principal');

if (menuToggle && menuPrincipal) {
    const cerrarMenu = () => {
        menuToggle.classList.remove('is-open');
        menuPrincipal.classList.remove('is-open');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
    };

    menuToggle.addEventListener('click', () => {
        const estaAbierto =
            menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.classList.toggle('is-open', !estaAbierto);
        menuPrincipal.classList.toggle('is-open', !estaAbierto);

        menuToggle.setAttribute(
            'aria-expanded',
            String(!estaAbierto)
        );

        menuToggle.setAttribute(
            'aria-label',
            estaAbierto ? 'Abrir menú' : 'Cerrar menú'
        );
    });

    menuPrincipal.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', cerrarMenu);
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            cerrarMenu();
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (evento) => {
        if (!evento.target.closest('nav')) {
            cerrarMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });
}