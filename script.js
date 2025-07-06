document.addEventListener('DOMContentLoaded', () => {
    // Ambil semua elemen yang kita butuhkan
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');

    const countdownElement = document.getElementById('countdown');
    const flame = document.getElementById('flame');
    const box = document.getElementById('box');
    const music = document.getElementById('background-music');
    const confettiContainer = document.getElementById('confetti-container');

    // --- FUNGSI UNTUK MEMBUAT KONFETI ---
    const createConfetti = () => {
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * -10 + 'vh';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
        if (confettiContainer) {
            confettiContainer.appendChild(confetti);
        }
        setTimeout(() => {
            confetti.remove();
        }, 7000);
    };

    // --- LOGIKA UTAMA SAAT TOMBOL "MULAI" DIKLIK ---
    startButton.addEventListener('click', () => {
        // 1. Sembunyikan layar pembuka
        startScreen.classList.add('hidden');
        // 2. Tampilkan adegan tiup lilin
        scene1.classList.remove('hidden');
        
        // 3. Putar musik (SEKARANG PASTI BERHASIL)
        if (music) {
            music.play();
        }

        // 4. Mulai logika adegan 1 (konfeti & countdown)
        // Buat konfeti awal
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }

        // Logika Countdown
        let timeLeft = 10;
        countdownElement.textContent = timeLeft;

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Hooft...";
                if (flame) {
                    flame.style.transition = 'opacity 0.5s ease-out';
                    flame.style.opacity = '0';
                }
                setTimeout(() => {
                    scene1.classList.add('hidden');
                    scene2.classList.remove('hidden');
                }, 1500);
            }
        }, 1000);
    });

    // --- LOGIKA ADEGAN 2: KLIK KADO ---
    if (box) {
        box.addEventListener('click', () => {
            scene2.classList.add('hidden');
            scene3.classList.remove('hidden');
            // Hujani dengan konfeti terus menerus
            setInterval(createConfetti, 200);
        });
    }
});