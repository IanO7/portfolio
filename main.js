document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect for subtitle
    const text = "UWA Engineering & Data Science Student";
    const el = document.getElementById("typewriter");
    let i = 0;
    function typeWriter() {
        if (i <= text.length) {
            el.textContent = text.substring(0, i);
            i++;
            setTimeout(typeWriter, 55);
        }
    }
    typeWriter();

    const aboutBgTexts = document.querySelectorAll('.about-bg-text:not(.contact-bg-text)');
    const contactBgTexts = document.querySelectorAll('.contact-bg-text');
    function animateAboutBgText() {
        aboutBgTexts.forEach(aboutBgText => {
            const rect = aboutBgText.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const visible = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const percentVisible = Math.max(0, Math.min(1, visible / rect.height));
            const pageScroll = window.scrollY + windowHeight;
            const aboutTop = rect.top + window.scrollY;
            const aboutHeight = rect.height;
            let scrollProgress = (pageScroll - aboutTop) / (aboutHeight + windowHeight);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
            const slide = -200 + 400 * scrollProgress;
            aboutBgText.style.opacity = percentVisible;
            aboutBgText.style.transform = `translateX(${slide}px)`;
        });
        // Animate CONTACT from right to left
        contactBgTexts.forEach(contactBgText => {
            const rect = contactBgText.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const visible = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const percentVisible = Math.max(0, Math.min(1, visible / rect.height));
            const pageScroll = window.scrollY + windowHeight;
            const aboutTop = rect.top + window.scrollY;
            const aboutHeight = rect.height;
            let scrollProgress = (pageScroll - aboutTop) / (aboutHeight + windowHeight);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
            const slide = 200 - 400 * scrollProgress; // RHS to LHS
            contactBgText.style.opacity = percentVisible;
            contactBgText.style.transform = `translateX(${slide}px)`;
        });
    }
    window.addEventListener('scroll', animateAboutBgText);
    window.addEventListener('resize', animateAboutBgText);
    animateAboutBgText();

    // Project swipe reveal for all project sections
    const swipeMasks = document.querySelectorAll('.project-swipe-mask');
    function checkReveal() {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        swipeMasks.forEach(swipeMask => {
            const rect = swipeMask.getBoundingClientRect();
            // Reveal if the top of the section is within the upper half of the viewport
            if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.5) {
                swipeMask.classList.add('revealed');
            } else {
                swipeMask.classList.remove('revealed');
            }
        });
    }
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal();

    // Bootstrap 5.3+ color mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'bi bi-moon';
            themeText.textContent = 'Dark Mode';
        }
    }

    // On load, set theme from localStorage or system preference
    (function () {
        let stored = localStorage.getItem('theme');
        if (!stored) {
            stored = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        setTheme(stored);
    })();

    themeToggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-bs-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
});