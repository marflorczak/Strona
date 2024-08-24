document.addEventListener("DOMContentLoaded", function () {
    // Inicjalizacja mapy Google (jeśli używasz)
    if (document.getElementById('mapa')) {
        initMap();
    }

    // Funkcja do pokazywania i ukrywania szczegółów produktów
    const buttons = document.querySelectorAll(".show-details-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productDetails = this.nextElementSibling; // zakłada, że detale są bezpośrednio po przycisku
            const isVisible = productDetails.style.display === "block";

            // Ukryj wszystkie szczegóły produktów
            document.querySelectorAll(".product-details").forEach(detail => {
                detail.style.display = "none";
            });

            // Pokaż/ukryj szczegóły dla klikniętego produktu
            productDetails.style.display = isVisible ? "none" : "block";
        });
    });

    // Nasłuchiwacz zdarzenia klawiatury do zamykania lightboxa
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeLightbox(event);
        }
    });
});

let currentSlide = 0;
let currentProductId = null;
const slides = {
    product1: ['produkt1.jpg', 'produkt1_2.jpg', 'produkt1_3.jpg'],
    product2: ['produkt2.jpg', 'produkt2_2.jpg', 'produkt2_3.jpg'],
    product3: ['produkt3.jpg', 'produkt3_2.jpg', 'produkt3_3.jpg']
};

function openLightbox(productId) {
    currentProductId = productId;
    currentSlide = 0; // Resetuj numer slajdu
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Set the first image
    lightboxImg.src = slides[productId][currentSlide];
    lightbox.style.display = 'flex';
    lightbox.style.pointerEvents = 'auto'; // Umożliwia kliknięcia
}

function closeLightbox(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
    }
}

function changeSlide(n, event) {
    event.stopPropagation(); // Zatrzymaj propagację kliknięcia
    if (!currentProductId) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const totalSlides = slides[currentProductId].length;

    currentSlide = (currentSlide + n + totalSlides) % totalSlides;
    lightboxImg.src = slides[currentProductId][currentSlide];
}

function initMap() {
    const sklepLocation = { lat: 51.3528, lng: 19.5065 }; // Współrzędne geograficzne sklepu
    const map = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 15,
        center: sklepLocation,
    });
    const marker = new google.maps.Marker({
        position: sklepLocation,
        map: map,
    });
}
