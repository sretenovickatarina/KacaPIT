let slideIndex = 0;
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(index) {
  slideIndex = index;
  slides.style.transform = `translateX(-${slideIndex * 50}%)`; /* Move the slides based on the index */
}

prevBtn.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + 2) % 2;  // Cycle through slides
  showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % 2; // Cycle through slides
  showSlide(slideIndex);
});

// Optional: Show the first slide initially
showSlide(0);