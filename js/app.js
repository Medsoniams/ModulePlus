// Burger Menu
const burgerBtn = document.getElementById('burgerBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuItems = document.querySelectorAll('.menu-item');

// Переключение меню при клике на бургер
burgerBtn.addEventListener('click', function () {
  const isActive = burgerBtn.classList.contains('active');
  if (isActive) {
    burgerBtn.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    burgerBtn.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});

// Закрытие меню и прокрутка при клике на пункт меню
menuItems.forEach(item => {
  item.addEventListener('click', function () {
    const targetId = item.getAttribute('data-href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    burgerBtn.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Закрытие меню при клике вне области
menuOverlay.addEventListener('click', function (e) {
  if (e.target === menuOverlay) {
    burgerBtn.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
  const heroSlider = document.querySelector('.hero');
  if (heroSlider) {
    const heroSlides = heroSlider.querySelectorAll('.hero .slide');
    const heroPrevBtn = heroSlider.querySelector('.hero-arrow-left');
    const heroNextBtn = heroSlider.querySelector('.hero-arrow-right');

    let heroCurrentSlide = 0;
    const heroTotalSlides = heroSlides.length;

    function showHeroSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroSlides[index].classList.add('active');
    }

    function heroNextSlide() {
      heroCurrentSlide = (heroCurrentSlide + 1) % heroTotalSlides;
      showHeroSlide(heroCurrentSlide);
    }

    function heroPrevSlide() {
      heroCurrentSlide = (heroCurrentSlide - 1 + heroTotalSlides) % heroTotalSlides;
      showHeroSlide(heroCurrentSlide);
    }

    if (heroPrevBtn && heroNextBtn) {
      heroPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        heroPrevSlide();
      });
      heroNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        heroNextSlide();
      });
    }

    // Initialize
    if (heroTotalSlides > 0) {
      showHeroSlide(heroCurrentSlide);
    }
  }
});

// Technology Slider
document.addEventListener('DOMContentLoaded', function() {
  const techSlider = document.querySelector('.technology-inner');
  if (techSlider) {
    const techSlides = techSlider.querySelectorAll('.slide');
    const techPrevBtn = techSlider.querySelector('.slider-nav.prev');
    const techNextBtn = techSlider.querySelector('.slider-nav.next');

    let techCurrentSlide = 0;
    const techTotalSlides = techSlides.length;

    function showTechSlide(index) {
      techSlides.forEach(slide => slide.classList.remove('active'));
      techSlides[index].classList.add('active');
    }

    function techNextSlide() {
      techCurrentSlide = (techCurrentSlide + 1) % techTotalSlides;
      showTechSlide(techCurrentSlide);
    }

    function techPrevSlide() {
      techCurrentSlide = (techCurrentSlide - 1 + techTotalSlides) % techTotalSlides;
      showTechSlide(techCurrentSlide);
    }

    if (techPrevBtn && techNextBtn) {
      techPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        techPrevSlide();
      });
      techNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        techNextSlide();
      });
    }

    // Initialize
    if (techTotalSlides > 0) {
      showTechSlide(techCurrentSlide);
    }
  }
});

// Project Cards Slider
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project");

  projectCards.forEach(card => {
    const slides = card.querySelectorAll(".project-slider .slide");
    const prevButton = card.querySelector(".projects-button-prev");
    const nextButton = card.querySelector(".projects-button-next");

    let currentIndex = 0;

    function showProjectSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showProjectSlide(currentIndex);
    });

    nextButton.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % slides.length;
      showProjectSlide(currentIndex);
    });

    // Initialize
    showProjectSlide(currentIndex);
  });
});

// Projects Loader
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".projects");
  const projectCards = projectsContainer.querySelectorAll(".project");
  const loaderButton = document.querySelector(".projects-loader");
  const cardsPerPage = 6;
  let visibleCards = cardsPerPage;

  // Проверка видимости кнопки загрузки
  function updateLoaderVisibility() {
    if (visibleCards >= projectCards.length) {
      loaderButton.style.display = "none";
    } else {
      loaderButton.style.display = "flex";
    }
  }

  // Загрузка дополнительных карточек
  loaderButton.addEventListener("click", () => {
    const nextCards = Array.from(projectCards).slice(visibleCards, visibleCards + cardsPerPage);
    nextCards.forEach(card => {
      card.classList.add("visible");
      // Отладка: проверяем, применился ли класс и стили
      console.log("Card:", card, "ClassList:", card.classList, "Opacity:", window.getComputedStyle(card).opacity);
    });
    visibleCards += cardsPerPage;
    updateLoaderVisibility();
  });

  // Начальная проверка видимости кнопки
  updateLoaderVisibility();
});

// FAQ
document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', toggleQuestion);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleQuestion.call(question);
      }
    });
  });

  function toggleQuestion() {
    const isActive = this.classList.contains('active');
    const answer = this.nextElementSibling;

    questions.forEach(q => {
      q.classList.remove('active');
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.classList.remove('active');
    });

    if (!isActive) {
      this.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
      answer.classList.add('active');
    }
  }
});