'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionAbout = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.skills__tab');
const tabsContainer = document.querySelector('.skills__tab-container');
const tabsContent = document.querySelectorAll('.skills__content');
const toggle = document.querySelector('.light-dark-btn');
const sectionHeader = document.getElementById('section--0');
const sectionSkills = document.getElementById('section--2');
const lists = document.querySelectorAll('.nav_color');
const lightMode = document.querySelector('body');
const aboutPng = document.querySelector('.aboutme__img');
//Mobile Navigation
const navBar = document.querySelector('.nav_links');
const btnNav = document.querySelector('.btn-mobile-nav');
const closeBtn = document.querySelector('.close');
const element = document.querySelector('.mobile-times');

//=================================== Active nav buttons on click ================================//
const activeLink = function (li) {
  lists.forEach(item => item.classList.remove('active', 'color_dark'));
  li.classList.add('active');
  console.log(li);
};

lists.forEach(item =>
  item.addEventListener('click', function () {
    activeLink(this);
  })
);

//Active Nav Function when using DARK mode
const ActiveDark = function (li) {
  //Checking if the body contains the dark-mode class
  if (document.body.classList.contains('dark-mode')) {
    //Adding the dark color class
    li.classList.add('color_dark');
  }
};
//Adding a click event on each list item to add and remove the class
lists.forEach(item =>
  item.addEventListener('click', function () {
    ActiveDark(this);
  })
);

toggle.addEventListener('click', () => {
  toggle.classList.toggle('color_dark');
  toggle.classList.toggle('dm-b-c');
});

//====================================== DARK LIGHT MODE =============================//

//Getting the Desktop backgrounds
let imgsHeader = ['frames/Frame-header-dark.png', 'frames/Frame-header.png'];
let imgsAbout = ['frames/Frame-about-dark.png', 'frames/Frame-about.png'];
let imgsAboutMain = ['img/about-dark.png', 'img/about.png'];
let imgsSkills = ['frames/Skills_dark.png', 'frames/Skills.png'];

//each letter represents the first letter of a section h-header a-about etc!
let h = 0;
let a = 0;
let iam = 0;
let s = 0;

//Getting the mobile backgrounds
let imgsHeaderMob = [
  'frames/Mobile-frame-header-dark.png',
  'frames/Mobile-frame-header.png',
];
let imgsAboutMob = [
  'frames/Mobile-frame-about-dark.png',
  'frames/Mobile-frame-about.png',
];
let imgsSkillsMob = ['frames/Skills-mob-dark.png', 'frames/Skills-mobile.png'];

//each letter represents the first letter of a section h-header a-about etc!
let hm = 0;
let am = 0;
let sm = 0;

const darkMode = () => {
  lightMode.classList.toggle('dark-mode');

  aboutPng.src = imgsAboutMain[h];

  iam = (iam + 1) % imgsAboutMain.length;

  if (window.innerWidth >= 544) {
    sectionHeader.style.backgroundImage = 'url(' + imgsHeader[h] + ')';
    sectionAbout.style.backgroundImage = 'url(' + imgsAbout[a] + ')';
    sectionSkills.style.backgroundImage = 'url(' + imgsSkills[s] + ')';
    h = (h + 1) % imgsHeader.length;
    a = (a + 1) % imgsAbout.length;
    s = (s + 1) % imgsSkills.length;
  } else if (window.innerWidth <= 545) {
    sectionHeader.style.backgroundImage = 'url(' + imgsHeaderMob[hm] + ')';
    sectionAbout.style.backgroundImage = 'url(' + imgsAboutMob[am] + ')';
    sectionSkills.style.backgroundImage = 'url(' + imgsSkillsMob[sm] + ')';

    hm = (hm + 1) % imgsHeaderMob.length;
    am = (am + 1) % imgsAboutMob.length;
    sm = (sm + 1) % imgsSkillsMob.length;
  }
};

toggle.addEventListener('click', darkMode);

// ==================== Mobile Navigation ================== //
//Function to make the CLOSE "X" button visible
function closeIcon() {
  btnNav.style.display = 'none';
  closeBtn.style.display = 'block';
  element.style.display = 'block';
}

//Function to make the OPEN "hamburger" button visible
function openIcon() {
  btnNav.style.display = 'block';
  closeBtn.style.display = 'none';
}

//Adding click event to the hamburger Btn to open the nav
btnNav.addEventListener('click', function (e) {
  e.preventDefault();
  if (!navBar.classList.contains('nav-open')) navBar.classList.add('nav-open');
  //calling the close button function
  closeIcon();
});

//Adding click event to the X button to close the nav
closeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (navBar.classList.contains('nav-open'))
    navBar.classList.remove('nav-open');
  //calling the open button function
  openIcon();
});

//Setting function to the window to prevent buttons from showing on desktop version
window.onresize = function (event) {
  if (event.currentTarget.outerWidth >= 544) {
    btnNav.style.display = 'none';
    closeBtn.style.display = 'none';
    element.style.display = 'none';
  } else {
    btnNav.style.display = 'block';
    closeBtn.style.display = 'none';
    element.style.display = 'none';
  }
};

//Adding click event to the window obj so we can close the nav by clicking anywhere on the screen
document.addEventListener(
  'click',
  function () {
    //checking if the navbar contains the open class
    if (navBar.classList.contains('nav-open')) {
      navBar.classList.remove('nav-open');
      openIcon();
    }
  },
  true
);

// ===================================== scroll down btn smooth scrolling ===============================//

btnScrollTo.addEventListener('click', function (e) {
  sectionAbout.scrollIntoView({ behavior: 'smooth' });
});

//============================ Page navigation==================================//

document.querySelectorAll('.nav_link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav_links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//====================================== Tabbed component==============================//

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.skills__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('skills__tab--active'));
  tabsContent.forEach(c => c.classList.remove('skills__content--active'));

  // Activate tab
  clicked.classList.add('skills__tab--active');

  // Activate content area
  document
    .querySelector(`.skills__content--${clicked.dataset.tab}`)
    .classList.add('skills__content--active');
});

//===================================== Menu fade animation===========================//
const handleHover = function (e) {
  if (e.target.classList.contains('nav_link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav_link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// =================================Sticky navigation: IntersectionObserver===============//

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// ==========================================Reveal sections========================================
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//====================================== Slider================================//
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// ====================================" Slider Certificate" =================================== //

let sliderImages = document.querySelectorAll('.mySlides');
let arrowLeft = document.querySelector('.prev');
let arrowRight = document.querySelector('.next');
let current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

// Initial slide
function startSlide() {
  reset();
  sliderImages[0].style.display = 'block';
}

// Show previous
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

// Left arrow click
arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener('click', function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

//===================================================== Portfolio Modal window ====================================//
const openEls = document.querySelectorAll('[data-open]');
const closeEls = document.querySelectorAll('[data-close]');
const overlayPortfolio = document.querySelector('.port--overlay');
const isVisible = 'is-visible';

for (const el of openEls) {
  el.addEventListener('click', function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    overlayPortfolio.classList.remove('hidden');
  });
}

for (const el of closeEls) {
  el.addEventListener('click', function () {
    this.parentElement.parentElement.classList.remove(isVisible);
    overlayPortfolio.classList.add('hidden');
  });
}

document.addEventListener('keydown', e => {
  // if we press the ESC
  if (e.key == 'Escape' && document.querySelector('.port--modal.is-visible')) {
    //getting rid of the modal
    document
      .querySelector('.port--modal.is-visible')
      .classList.remove(isVisible);
    //getting rid of the overlay
    overlayPortfolio.classList.add('hidden');
  }
});

//=============================================== CONTACT ME Modal window========================//

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//================================Contactme Modal Window input functionality=========================//

const form = $('#contact'),
  submit = form.find('[name="submit"]');

form.on('submit', function (e) {
  e.preventDefault();

  // avoid spamming buttons
  if (submit.attr('value') !== 'Send') return;

  var valid = true;
  form
    .find('input, textarea')
    .removeClass('invalid')
    .each(function () {
      if (!this.value) {
        $(this).addClass('invalid');
        valid = false;
      }
    });

  if (!valid) {
    form
      .animate({ left: '-3em' }, 50)
      .animate({ left: '3em' }, 100)
      .animate({ left: '0' }, 50);
  } else {
    submit.attr('value', 'Sending...').css({
      boxShadow: '0 0 200em 200em rgba(225, 225, 225, 0.6)',
      backgroundColor: '#ccc',
    });
    // simulate AJAX response
    setTimeout(function () {
      // step 1: slide labels and inputs
      // when AJAX responds with success
      // no animation for AJAX failure yet
      form
        .find('label')
        .animate({ left: '100%' }, 500)
        .animate({ opacity: '0' }, 500);
    }, 1000);
    setTimeout(function () {
      // step 2: show thank you message after step 1
      submit.attr('value', 'Thank you!').css({ boxShadow: 'none' });
    }, 2000);
    setTimeout(function () {
      // step 3: reset
      form.find('input, textarea').val('');
      form.find('label').css({ left: '0' }).animate({ opacity: '1' }, 500);
      submit.attr('value', 'Send').css({ backgroundColor: '' });
    }, 4000);
  }
});

//===================================Back to top button===============================//

const btnToTop = document.querySelector('.back-to-top');

window.onscroll = () => {
  toggleTopButton();
};

function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.back-to-top').classList.add('active');
  } else {
    document.querySelector('.back-to-top').classList.remove('active');
  }
}

btnToTop.addEventListener('click', scrollToTop);

//=================================== VISITORS COUNTER FUNCTIONALITY ===============================//

const KEY = `0ff02be6-b779-11ed-afa1-0242ac120002`;
const NAMESPACE = 'new-portfolio-pd.netlify.app';
const COUNT_URL = `https://api.countapi.xyz`;

const counter = document.querySelectorAll('.counter__value');

const getCount = async () => {
  const response = await fetch(`${COUNT_URL}/get/${NAMESPACE}/${KEY}`);
  const data = await response.json();
  setValue(data.value);
};

const incrementCount = async () => {
  const response = await fetch(`${COUNT_URL}/hit/${NAMESPACE}/${KEY}`);
  const data = await response.json();
  setValue(data.value);
};

const setValue = num => {
  var str = num.toString().padStart(6, '0');
  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    counter[index].innerHTML = element;
  }
};

if (localStorage.getItem('hasVisited') == null) {
  incrementCount()
    .then(() => {
      localStorage.setItem('hasVisited', 'true');
    })
    .catch(err => console.log(err));
} else {
  getCount().catch(err => console.log(err));
}
