/**
 * Creates and initializes a carousel for the learning section
 * @param {HTMLElement} container - The learning card element where to add the carousel
 * @param {string} weekNumber - The week number (e.g., "1", "2", etc.)
 */
function initLearningCarousel(container, weekNumber) {
  // Create carousel if it doesn't exist
  if (!container.querySelector(".learning-carousel")) {
    // Load the carousel HTML structure
    const carouselHTML = `
      <div class="learning-carousel">
        <div class="carousel-container">
          <div class="carousel-track">
            <div class="carousel-slide">
              <img src="assets/Learning/images/semana_${weekNumber}/image1.png" alt="Week ${weekNumber} - Image 1">
            </div>
            <div class="carousel-slide">
              <img src="assets/Learning/images/semana_${weekNumber}/image2.png" alt="Week ${weekNumber} - Image 2">
            </div>
            <div class="carousel-slide">
              <img src="assets/Learning/images/semana_${weekNumber}/image3.png" alt="Week ${weekNumber} - Image 3">
            </div>
          </div>
          <button class="carousel-button prev-button" aria-label="Previous slide">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button class="carousel-button next-button" aria-label="Next slide">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
        <div class="carousel-dots">
          <span class="carousel-dot active" data-index="0"></span>
          <span class="carousel-dot" data-index="1"></span>
          <span class="carousel-dot" data-index="2"></span>
        </div>
      </div>
    `;

    // Get the content div of the learning card
    const cardContent = container.querySelector(".card-content");

    // Insert carousel after the reflection section
    const reflectionSection = cardContent.querySelector(".reflection");
    reflectionSection.insertAdjacentHTML("afterend", carouselHTML);

    // Get the carousel elements
    const carousel = cardContent.querySelector(".learning-carousel");
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevButton = carousel.querySelector(".prev-button");
    const nextButton = carousel.querySelector(".next-button");
    const dots = carousel.querySelectorAll(".carousel-dot");

    // Set initial position
    let currentIndex = 0;

    // Function to update the carousel position
    function updateCarousel() {
      // Update track position
      track.style.transform = `translateX(-${
        currentIndex * (100 / slides.length)
      }%)`;

      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    // Event listeners for navigation
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    // Event listeners for dots
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentIndex = parseInt(dot.dataset.index);
        updateCarousel();
      });
    });

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - go to next
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - go to previous
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    }

    // Auto-advance the carousel every 5 seconds
    let autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);

    // Pause autoplay when user interacts with carousel
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 5000);
    });

    // Handle keyboard navigation for accessibility
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
    });
  }
}

// Initialize all learning carousels when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for learning.js to initialize learning cards first
  setTimeout(() => {
    const learningCards = document.querySelectorAll("#learning .learning-card");

    // Initialize carousel for each learning card
    learningCards.forEach((card, index) => {
      // Extract week number from the badge text
      const weekBadge = card.querySelector(".week-badge");
      const weekText = weekBadge.textContent; // "Semana X"
      const weekNumber = weekText.replace("Semana ", "");

      // Initialize carousel for this card
      initLearningCarousel(card, weekNumber);
    });
  }, 100); // Small delay to ensure learning.js has run
});
