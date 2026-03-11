// Cambio de Tema
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
// Pasta Carousel
(function () {
    const INTERVAL_MS = 5000; // Tiempo entre slides (milisegundos)
    const carousel = document.getElementById('pasta-carousel');
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.pasta-slide');
    const dotsContainer = document.getElementById('pasta-carousel-dots');
    if (slides.length === 0) return;

    let current = 0;
    let timer = null;

    // Genera los dots automáticamente según la cantidad de slides
    slides.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'pasta-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Imagen ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.pasta-dot');

    function goTo(index) {
        slides[current].classList.remove('opacity-100');
        slides[current].classList.add('opacity-0');
        dots[current].classList.remove('active');
        current = index;
        slides[current].classList.remove('opacity-0');
        slides[current].classList.add('opacity-100');
        dots[current].classList.add('active');
        resetTimer();
    }

    function next() {
        goTo((current + 1) % slides.length);
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, INTERVAL_MS);
    }

    resetTimer();
})();