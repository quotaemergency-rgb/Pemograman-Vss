
/* =========================
   AUDIO LATAR BELAKANG
========================= */

const backgroundMusic = document.getElementById("background-music");

if (backgroundMusic) {
    const startMusic = () => {
        backgroundMusic.currentTime = 25;
        backgroundMusic.volume = 0.1;

        backgroundMusic.play().catch(() => {
            // Browser mungkin memblokir autoplay.
            // Musik akan dicoba diputar setelah interaksi pertama.
        });
    };

    backgroundMusic.addEventListener("loadedmetadata", startMusic, {
        once: true
    });

    // Jika metadata sudah tersedia, langsung coba putar.
    if (backgroundMusic.readyState >= 1) {
        startMusic();
    }

    // Jika autoplay diblokir, coba mulai setelah pengunjung
    // berinteraksi dengan halaman.
    const playAfterInteraction = () => {
        if (backgroundMusic.paused) {
            backgroundMusic.currentTime = 25;
            backgroundMusic.play().catch(() => {});
        }
    };

    document.addEventListener("pointerdown", playAfterInteraction, {
        once: true
    });

    document.addEventListener("keydown", playAfterInteraction, {
        once: true
    });
    
}










/* =========================
   SLIDESHOW TESTIMONI
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".testimoni-slider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".testimoni-slide");
    const dotsContainer = slider.querySelector(".testimoni-dots");
    const prevButton = slider.querySelector(".testimoni-nav.prev");
    const nextButton = slider.querySelector(".testimoni-nav.next");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoSlide;

    slides.forEach(function (_, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "testimoni-dot";
        dot.setAttribute("aria-label", "Buka testimoni " + (index + 1));

        dot.addEventListener("click", function () {
            showSlide(index);
            startAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".testimoni-dot");

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        clearInterval(autoSlide);

        autoSlide = setInterval(function () {
            nextSlide();
        }, 4000);
    }

    nextButton.addEventListener("click", function () {
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", function () {
        prevSlide();
        startAutoSlide();
    });

    slider.addEventListener("mouseenter", function () {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", function () {
        startAutoSlide();
    });

    showSlide(0);
    startAutoSlide();
});










/* =========================
   SLIDE PANEL NAVIGASI
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const panel = document.getElementById("slidePanel");
    const overlay = document.getElementById("slideOverlay");
    const closeButton = document.getElementById("slideClose");
    const content = document.getElementById("slidePanelContent");

    if (!panel || !overlay || !closeButton || !content) return;

    const menuContent = {
        "Profil Bisnis": `
            <h2>Profil Bisnis</h2>
            <p>
                Access Motors Sumbar berdiri pada tahun 2022
                sebagai bagian dari perjalanan dalam mengembangkan
                usaha di bidang otomotif.
            </p>
        `,
        "Aktivitas": `
            <h2>Aktivitas Bisnis</h2>
            <p>
                Dokumentasi kegiatan dan aktivitas Access Motors Sumbar.
            </p>
            <p>
                <a href="https://photos.app.goo.gl/mojYPxmwAv5kx8NFA"
                   target="_blank" rel="noopener noreferrer">
                    Lihat dokumentasi kegiatan
                </a>
            </p>
        `,
        "Media Sosial": `
            <h2>Media Sosial</h2>
            <p>
                Silakan ikuti akun media sosial pribadi saya untuk
                melihat aktivitas, pengalaman, dan perjalanan
                pribadi maupun profesional saya.
            </p>
            <p>
                <a href="https://www.instagram.com/access.motorsumbar/"
                   target="_blank" rel="noopener noreferrer">
                    Kunjungi Instagram
                </a>
            </p>
        `,
        "Kontak": `
            <h2>Kontak</h2>
            <p>Hubungi kami melalui WhatsApp.</p>
            <p>
                <a href="https://wa.me/6281266604731"
                   target="_blank" rel="noopener noreferrer">
                    Hubungi melalui WhatsApp
                </a>
            </p>
        `
    };

    function openPanel(title) {
        if (title === "Beranda") {
            closePanel();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (!menuContent[title]) return;

        content.innerHTML = menuContent[title];
        panel.classList.add("open");
        overlay.classList.add("open");
        document.body.classList.add("panel-open");
    }

    function closePanel() {
        panel.classList.remove("open");
        overlay.classList.remove("open");
        document.body.classList.remove("panel-open");
    }

    document.querySelectorAll(".navigation a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            const title = link.textContent.trim();

            if (menuContent[title] || title === "Beranda") {
                event.preventDefault();
                openPanel(title);
            }
        });
    });

    closeButton.addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closePanel();
    });
});
