document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const messageDiv = document.getElementById('form-message');
    const modal = new bootstrap.Modal(document.getElementById('potvrda-modal'));
    const modalMessage = document.getElementById('modal-message');

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
                    const response = await fetch('https://formspree.io/f/mwpblyjv', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        messageDiv.innerHTML = '<div class="alert alert-success shadow-sm">Zahtev uspešno poslat!</div>';
                        modalMessage.textContent = 'Vaš termin je uspešno zakazan. Kontaktiraćemo vas uskoro!';
                        modal.show();
                        form.reset();
                    } else {
                        messageDiv.innerHTML = '<div class="alert alert-danger shadow-sm">Greška pri slanju. Pokušajte ponovo.</div>';
                    }
                } catch (error) {
                    messageDiv.innerHTML = '<div class="alert alert-danger shadow-sm">Greška pri slanju. Proverite konekciju.</div>';
                    console.error('Error:', error);
                }
            } else {
                form.classList.add('was-validated');
            }
        });
    }

    // Ostali postojeći kod (npr. za navigaciju, lazy loading, lightbox) ostaje isti
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