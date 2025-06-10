document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').startsWith('#') 
                ? link.getAttribute('href').slice(1)
                : link.getAttribute('href');
            if (targetId.includes('.html')) {
                window.location.href = targetId;
            } else {
                const target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const toggleButtons = document.querySelectorAll('.toggle-details');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const collapse = document.querySelector(targetId);
            const bsCollapse = new bootstrap.Collapse(collapse, { toggle: true });
        });
    });

    const form = document.getElementById('kontakt-forma');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                const data = {
                    ime: form.querySelector('#ime').value,
                    email: form.querySelector('#email').value,
                    datum: form.querySelector('#datum').value,
                    poruka: form.querySelector('#poruka').value
                };
                try {
                    const response = await fetch('https://formspree.io/f/xqabkpwn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    const messageDiv = document.getElementById('form-message');
                    const modal = new bootstrap.Modal(document.getElementById('potvrda-modal'));
                    const modalMessage = document.getElementById('modal-message');
                    if (response.ok) {
                        messageDiv.innerHTML = '<div class="alert alert-success">Zahtev uspešno poslat!</div>';
                        modalMessage.textContent = 'Vaš termin je uspešno zakazan. Kontaktiraćemo vas uskoro!';
                        modal.show();
                        form.reset();
                        localStorage.setItem('kontakt-podaci', JSON.stringify(data));
                    } else {
                        messageDiv.innerHTML = '<div class="alert alert-danger">Greška pri slanju. Pokušajte ponovo.</div>';
                    }
                } catch {
                    messageDiv.innerHTML = '<div class="alert alert-danger">Greška pri slanju. Proverite konekciju.</div>';
                }
            } else {
                form.classList.add('was-validated');
            }
        });

        const savedData = localStorage.getItem('kontakt-podaci');
        if (savedData) {
            const data = JSON.parse(savedData);
            form.querySelector('#ime').value = data.ime || '';
            form.querySelector('#email').value = data.email || '';
        }
    }

    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    lazyImages.forEach(image => observer.observe(image));

    const sections = document.querySelectorAll('.animate-on-scroll');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => sectionObserver.observe(section));

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.close');
    const lightboxLinks = document.querySelectorAll('.lightbox');

    lightboxLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxImg.src = link.href;
            lightbox.style.display = 'flex';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});