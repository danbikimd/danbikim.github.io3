// 페이지 전체 로드 후에 작동하도록
window.addEventListener("load", () => {


  // ----------- // 섹션5- timer-container ------------------------
  // 타임특가 타이머 시간 움직이기
  function getNextSundayMidnight() {
    const now = new Date();
    const day = now.getDay();
    const diff = 7 - day;
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + diff);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
  }

  const deadline = getNextSundayMidnight();

  function updateTimer() {
    const now = new Date();
    const remaining = deadline - now;

    if (remaining <= 0) {
      document.getElementById('days').textContent = "0";
      document.getElementById('hours').textContent = "00";
      document.getElementById('minutes').textContent = "00";
      document.getElementById('seconds').textContent = "00";
      return;
    }

    const seconds = Math.floor((remaining / 1000) % 60);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const hours = Math.floor((remaining / 1000 / 60 / 60) % 24);
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);


 // ------------ section5-캐러셀 자연스러운 무한 슬라이드 --------------
const sc5Track = document.getElementById("sc5-carousel-track");
const sc5NextBtn = document.querySelector("#sc5-arrow-btn > #next-btn");
const sc5PrevBtn = document.querySelector("#sc5-arrow-btn > #prev-btn");

let busy = false;

function moveNext() {
  if (busy) return;
  busy = true;

  // 트랙 왼쪽으로 이동
  sc5Track.style.transition = "transform 0.4s ease";
  sc5Track.style.transform = "translateX(-100%)";

  sc5Track.addEventListener("transitionend", function handler() {
    sc5Track.removeEventListener("transitionend", handler);

    // 첫 슬라이드를 맨 뒤로 이동
    sc5Track.style.transition = "none";
    sc5Track.appendChild(sc5Track.firstElementChild);
    sc5Track.style.transform = "translateX(0)";

    // 강제 레이아웃 계산 (렌더링 지연 방지)
    void sc5Track.offsetWidth;

    busy = false;
  });
}

function movePrev() {
  if (busy) return;
  busy = true;

  // 마지막 슬라이드를 맨 앞으로
  sc5Track.style.transition = "none";
  sc5Track.insertBefore(sc5Track.lastElementChild, sc5Track.firstElementChild);
  sc5Track.style.transform = "translateX(-100%)";

  // 다음 프레임에서 슬라이드 복귀
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      sc5Track.style.transition = "transform 0.4s ease";
      sc5Track.style.transform = "translateX(0)";
    });
  });

  sc5Track.addEventListener("transitionend", function handler() {
    sc5Track.removeEventListener("transitionend", handler);
    busy = false;
  });
}

// 버튼 클릭 이벤트
sc5NextBtn.onclick = moveNext;
sc5PrevBtn.onclick = movePrev;


  // -----------------header----------------------------------


  // 네비게이션이 스크롤로 메인 콘텐츠 아래로 내려가면
  //  헤더(네비게이션 바)의 배경색이나 텍스트 스타일이 바뀌게

  window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > window.innerHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 높이(100vh)만큼
  //  아래로 스크롤하면 .scrolled 클래스가 추가되어 스타일이 바뀌게



  // 네비게이션 메뉴를 호버하면 #header의 높이가 높아지게
  const header = document.getElementById('header');
  const submenuItems = document.querySelectorAll('.has-submenu');

  submenuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      header.style.height = '260px'; // 아래로 확장
    });

    item.addEventListener('mouseleave', () => {
      header.style.height = '74px'; // 기본 높이 복원
    });
  });




});

//  --------------------서브-섹션1 캐러셀----------------
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById('section1-carousel-container');
  const prevBtn = document.getElementById('sc1-prev-btn');
  const nextBtn = document.getElementById('sc1-next-btn');
  let slides = Array.from(document.querySelectorAll('.sc1-carousel-track'));

  let slideWidth = carousel.offsetWidth;
  window.addEventListener('resize', () => slideWidth = carousel.offsetWidth);

  // 첫 슬라이드와 마지막 슬라이드 복제해서 앞뒤에 붙임
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, slides[0]);

  slides = Array.from(document.querySelectorAll('.sc1-carousel-track'));
  let index = 1; // 실제 첫 슬라이드 위치
  carousel.scrollLeft = slideWidth * index;

  function goToSlide(i) {
    carousel.scrollTo({ left: slideWidth * i, behavior: 'smooth' });
    index = i;
  }

  function checkLoop() {
    if (index === 0) {
      carousel.style.scrollBehavior = 'auto';
      index = slides.length - 2;
      carousel.scrollLeft = slideWidth * index;
      carousel.style.scrollBehavior = 'smooth';
    }
    if (index === slides.length - 1) {
      carousel.style.scrollBehavior = 'auto';
      index = 1;
      carousel.scrollLeft = slideWidth * index;
      carousel.style.scrollBehavior = 'smooth';
    }
  }

  prevBtn.onclick = () => goToSlide(index - 1);
  nextBtn.onclick = () => goToSlide(index + 1);

  let timeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      index = Math.round(carousel.scrollLeft / slideWidth);
      checkLoop();
    }, 100);
  });
});


//  --------------------서브-섹션2-신상품 캐러셀----------------
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('#section2-carousel-container');
  const leftBtn = document.querySelector('#sc2-prev-btn');
  const cards = Array.from(track.children);
  const cardStyle = getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginRight);

  const repeatCount = 10; // 너무 많으면 성능 저하 우려

  // 앞뒤로 복제
  for (let i = 0; i < repeatCount; i++) {
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true)); // 뒤쪽 복제
      track.insertBefore(card.cloneNode(true), track.firstChild); // 앞쪽 복제
    });
  }

  // 중앙 위치로 스크롤 (앞쪽 복제된 카드 수만큼)
  window.addEventListener('load', () => {
    track.scrollLeft = cardWidth * cards.length * repeatCount;
  });

  // 왼쪽 버튼 클릭 시 오른쪽으로 한 칸 이동
  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  // 자연스러운 무한 루프 구현
  let isThrottled = false;
  track.addEventListener('scroll', () => {
    if (isThrottled) return;
    isThrottled = true;

    const totalScrollWidth = cardWidth * cards.length * repeatCount * 2;
    const scrollLeft = track.scrollLeft;

    // 너무 왼쪽으로 가면 중앙으로 jump
    if (scrollLeft < cardWidth * cards.length) {
      track.scrollLeft = scrollLeft + cardWidth * cards.length * repeatCount;
    }

    // 너무 오른쪽으로 가면 중앙으로 jump
    if (scrollLeft > totalScrollWidth - cardWidth * cards.length) {
      track.scrollLeft = scrollLeft - cardWidth * cards.length * repeatCount;
    }

    setTimeout(() => isThrottled = false, 50);
  });
});



// -----------------서브-섹션4-배너 캐러셀----------------
  document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('sc4-carousel-track'); // 슬라이드들을 감싸는 요소
  const next = document.getElementById('sc4-next-btn');        // 오른쪽 버튼
  const prev = document.getElementById('sc4-prev-btn');        // 왼쪽 버튼

  let slideWidth = track.clientWidth; // 슬라이드 한 개의 너비

  // 시작할 때 마지막 슬라이드를 맨 앞에 넣고 위치 이동
  track.prepend(track.lastElementChild); 
  track.style.transition = 'none';
  track.style.transform = `translateX(-${slideWidth}px)`;

  // ▶ 다음 버튼 클릭 시
  function moveNext() {
    // 오른쪽으로 한 칸 이동
    track.style.transition = 'transform 0.4s ease';
    track.style.transform = `translateX(-${2 * slideWidth}px)`;

    // 애니메이션 끝난 후 첫 슬라이드를 뒤로 보내고 위치 초기화
    track.addEventListener('transitionend', function handler() {
      track.removeEventListener('transitionend', handler); // 이벤트 중복 방지
      track.appendChild(track.firstElementChild);          // 첫 번째 슬라이드를 맨 뒤로
      track.style.transition = 'none';                     // 애니메이션 없이 초기 위치로
      track.style.transform = `translateX(-${slideWidth}px)`;
    });
  }

  // ◀ 이전 버튼 클릭 시
  function movePrev() {
    track.style.transition = 'none';                       // 먼저 애니메이션 제거
    track.prepend(track.lastElementChild);                 // 마지막 슬라이드를 맨 앞으로
    track.style.transform = `translateX(0)`;               // 왼쪽으로 한 칸 밀기

    // 다음 프레임에 애니메이션 적용해 다시 가운데로 이동
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${slideWidth}px)`;
      });
    });
  }

  // 버튼 클릭 시 각각 이동 함수 실행
  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);

  // 창 크기 바뀔 때 슬라이드 너비 재계산
  window.addEventListener('resize', () => {
    slideWidth = track.clientWidth;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${slideWidth}px)`;
  });
});


// ------------------서브section1-스크롤애니메이션----------------
// #section1-container
document.addEventListener('DOMContentLoaded', () => {
const target1 = document.querySelector("#section1-container");

const observer1 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active1");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

observer1.observe(target1);});

// ------------------서브section2-스크롤애니메이션----------------
// #section2-container
document.addEventListener('DOMContentLoaded', () => {
const target2 = document.querySelector("#section2-container");

const observer2 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active2");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer2.observe(target2);});


// ------------------서브section3-스크롤애니메이션----------------
// #section3-container
document.addEventListener('DOMContentLoaded', () => {
const target3 = document.querySelector("#section3-container");

const observer3 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active3");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer3.observe(target3);});


// ------------------서브section5-스크롤애니메이션----------------
// #section5-container
document.addEventListener('DOMContentLoaded', () => {
const target5 = document.querySelector("#section5-container");

const observer5 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active4");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer5.observe(target5);});


// ------------------서브section6-스크롤애니메이션----------------
// #filter-container
document.addEventListener('DOMContentLoaded', () => {
const target5 = document.querySelector("#filter-container");

const observer5 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active5");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer5.observe(target5);});


// ------------------서브section7-스크롤애니메이션----------------
// #section7-container
document.addEventListener('DOMContentLoaded', () => {
const target7 = document.querySelector("#section7-container");

const observer7 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active7");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer7.observe(target7);});

