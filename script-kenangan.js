document.addEventListener('DOMContentLoaded', () => {
    // --- FUNGSI UNTUK ANIMASI MENGETIK ---
    function typeWriter(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.visibility = 'visible';
        let i = 0;
        const speed = 50;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Logika untuk animasi saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'surat-cinta') {
                    typeWriter(entry.target);
                    observer.unobserve(entry.target);
                } else {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    const hiddenElements = document.querySelectorAll('.scroll-animation, #surat-cinta');
    hiddenElements.forEach((el) => {
        if(el.id === 'surat-cinta') el.style.visibility = 'hidden';
        observer.observe(el);
    });

    // Logika untuk melanjutkan musik
    const music = document.getElementById('background-music2');
    if (music) {
        music.play().catch(error => {
            console.log("Musik diblokir, menunggu interaksi user.");
            document.body.addEventListener('click', () => music.play(), { once: true });
            document.body.addEventListener('scroll', () => music.play(), { once: true });
        });
    }

    // ==================================
    // LOGIKA POP-UP SURAT UTAMA (TAMBAHKAN INI)
    // ==================================
    const openModalButton = document.querySelector('.button-loa');
    const closeModalButton = document.querySelector('.close-button');
    const modalOverlay = document.getElementById('surat-modal');

    if(openModalButton && modalOverlay){
        openModalButton.addEventListener('click', (event) => {
            event.preventDefault();
            modalOverlay.classList.remove('hidden');
        });
    }
    
    if(closeModalButton && modalOverlay){
        closeModalButton.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });
    }

    if(modalOverlay){
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
            }
        });
    }
});