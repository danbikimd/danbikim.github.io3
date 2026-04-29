
// 페이지 전체 로드 후에 작동하도록
window.addEventListener("load", () => {



  
// ------------섹션1 -갤러리 페이지 플러스 버튼 누르면 제품명 나오게





  // 섹션3- timer-container ------------------------
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
  
// ------------section3-캐러셀 슬라이드 이동------------------------
const sc3Track = document.getElementById("sc3-carousel-track"); // 슬라이드 컨테이너
const sc3NextBtn = document.querySelector("#sc3-arrow-btn>#next-btn"); // 다음 버튼
const sc3PrevBtn = document.querySelector("#sc3-arrow-btn>#prev-btn"); // 이전 버튼

let busy = false; // 슬라이드 동작 중복 방지 플래그

// 다음 버튼 클릭 후 트랜지션 종료 시 실행되는 함수
function onTransitionEndNext() {
  // 첫 번째 아이템을 맨 뒤로 이동 (무한 슬라이드 효과)
  sc3Track.appendChild(sc3Track.firstElementChild);
  // 트랜지션 제거하고 위치 초기화
  sc3Track.style.transition = "none";
  sc3Track.style.transform = "translateX(0)";
  busy = false; // 슬라이드 동작 완료
  sc3Track.removeEventListener("transitionend", onTransitionEndNext); // 이벤트 해제
}

// 이전 버튼 클릭 후 트랜지션 종료 시 실행되는 함수
function onTransitionEndPrev() {
  busy = false; // 슬라이드 동작 완료
  sc3Track.removeEventListener("transitionend", onTransitionEndPrev); // 이벤트 해제
}

// 다음 버튼 클릭 이벤트
sc3NextBtn.onclick = () => {
  if (busy) return; // 동작 중이면 무시
  busy = true; // 슬라이드 동작 시작
  // 왼쪽으로 슬라이드 이동 (100%만큼)
  sc3Track.style.transition = "transform 0.4s";
  sc3Track.style.transform = "translateX(-100%)";
  // 트랜지션 종료 이벤트에 콜백 등록
  sc3Track.addEventListener("transitionend", onTransitionEndNext);
};

// 이전 버튼 클릭 이벤트
sc3PrevBtn.onclick = () => {
  if (busy) return; // 동작 중이면 무시
  busy = true; // 슬라이드 동작 시작
  // 맨 마지막 아이템을 맨 앞으로 이동하고 위치를 왼쪽으로 이동한 상태로 설정
  sc3Track.insertBefore(sc3Track.lastElementChild, sc3Track.firstElementChild);
  sc3Track.style.transition = "none";
  sc3Track.style.transform = "translateX(-100%)";
  
  // 다음 프레임에서 트랜지션 적용하여 원위치로 이동 (부드러운 슬라이드 효과)
  requestAnimationFrame(() => {
    sc3Track.style.transition = "transform 0.4s";
    sc3Track.style.transform = "translateX(0)";
  });
  // 트랜지션 종료 이벤트에 콜백 등록
  sc3Track.addEventListener("transitionend", onTransitionEndPrev);
};

 


  // -------------------스크롤 애니메이션----------------------------------

  // ----------------main------------------------

// 애니메이션 재시작 함수
function restartAnimation(el, baseClass) {
  el.classList.remove(baseClass, "fade-in");
  void el.offsetWidth; // 리플로우 발생시키기(강제 재실행)
  el.classList.add("fade-in", baseClass);
}

// 모든 .inner 슬라이드 요소 선택
const inners = document.querySelectorAll("#carousel-container .inner");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const inner = entry.target;
      const isVisible = entry.isIntersecting;

       // 4번째 .inner(nth-of-type(4))는 제외
      if ([...inners].indexOf(inner) === 3) { // 인덱스는 0부터 시작하니까 3이 4번째
        return; // 아무 작업 안 함
      }

      // 슬라이드 내 텍스트 요소들
      const h1 = inner.querySelector("h1");
      const h2 = inner.querySelector("h2");
      const p = inner.querySelector("p");
      const a = inner.querySelector("a");

      if (isVisible) {
        if (h1) restartAnimation(h1, "fade-in-h1");
        if (h2) restartAnimation(h2, "fade-in-h2");
        if (p) restartAnimation(p, "fade-in-p");
        if (a) restartAnimation(a, "fade-in-a");
      } else {
        if (h1) h1.classList.remove("fade-in", "fade-in-h1");
        if (h2) h2.classList.remove("fade-in", "fade-in-h2");
        if (p) p.classList.remove("fade-in", "fade-in-p");
        if (a) a.classList.remove("fade-in", "fade-in-a");
      }
    });
  },
  { threshold: 0.5 }
);

// 모든 슬라이드에 옵저버 연결
inners.forEach((inner) => observer.observe(inner));



// ------------------section1-스크롤애니메이션----------------
// #section1-container>h2
const targetText1 = document.querySelector("#section1-container>h2");

const observerText1 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active1");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observerText1.observe(targetText1);


// #category-buttons
const targetImg = document.querySelector("#category-buttons");

const observerImg = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active2");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerImg.observe(targetImg);


// #section1-carousel-container
const targetImg2 = document.querySelector("#section1-carousel-container");

const observerImg2 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active3");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

observerImg2.observe(targetImg2);


// -----------------------section2-스크롤 애니메이션--------------------
// #section2-container 배경 이미지들
const targetImg3 = document.querySelector("#about-us");

const observerImg3 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active4");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

observerImg3.observe(targetImg3);



// #introduction-text
const targetText2 = document.querySelector("#introduction-text");

const observerText2 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active5");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

observerText2.observe(targetText2);


// -----------------------section3-스크롤 애니메이션--------------------
// #ssem-festa-banner
const targetImg4 = document.querySelector("#ssem-festa-banner");

const observerImg4 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active6");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerImg4.observe(targetImg4);


// #timer-container
const targetText3 = document.querySelector("#timer-container");

const observerText3 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active7");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerText3.observe(targetText3);


// #sc3-carousel-wrapper
const targetImg5 = document.querySelector("#sc3-carousel-wrapper");

const observerImg5 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active8");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerImg5.observe(targetImg5);




// --------------------section4-베스트-스크롤 애니메이션----------------

// #section4-container>p
const targetText4 = document.querySelector("#section4-container>p");

const observerText4 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active10");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerText4.observe(targetText4);


// #section4-container>h2
const targetText5 = document.querySelector("#section4-container>h2");

const observerText5 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active11");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerText5.observe(targetText5);



// #prouduct-box
const targetImg6 = document.querySelector("#prouduct-box");

const observerImg6 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active12");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerImg6.observe(targetImg6);


// --------------------section5-컨텍트-스크롤 애니메이션----------------

// #section5-container
const targetImg7 = document.querySelector("#section5-container");

const observerImg7 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active13");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

observerImg7.observe(targetImg7);









// 다른 js 기능 적용
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






// -----------------------------------main----------------------------

// main 바닥 버튼----------------------------------
// '버튼2' 을 누르면 왼쪽으로 100vw 만큼 이동한다
// = '버튼'을 누르면 .container를  transform:translate(-100vw) 만큼 이동해준다

document.getElementById('bottom-btn1').addEventListener('click', function () {
    document.getElementById('carousel-container').style.transform = 'translate(0vw)';
})
document.getElementById('bottom-btn2').addEventListener('click', function () {
    document.getElementById('carousel-container').style.transform = 'translate(-100vw)';
})
document.getElementById('bottom-btn3').addEventListener('click', function () {
    document.getElementById('carousel-container').style.transform = 'translate(-200vw)';
})
document.getElementById('bottom-btn4').addEventListener('click', function () {
    document.getElementById('carousel-container').style.transform = 'translate(-300vw)';
})
document.getElementById('bottom-btn5').addEventListener('click', function () {
    document.getElementById('carousel-container').style.transform = 'translate(-400vw)';
})
// 1. 다음버튼 이전버튼 어떻게 만들지? 
// 2. 확장성잡기 ( 그림/버튼이 몇개있든 잘 동작하게 하려면?)



// --------------화살표 버튼 누르면 옆으로 이동-------------

const container = document.getElementById('carousel-container'); // 슬라이드 전체를 감싸는 컨테이너
const dots = document.querySelectorAll('#main-bottom-btn > span'); // 하단 점(dot) 요소들
const totalSlides = container.children.length; // 슬라이드 개수
const slideWidthVW = 100; // 슬라이드 너비 (100vw 기준)

let isMoving = false; // 슬라이드 이동 중복 방지용 플래그

// 1. 각 슬라이드에 data-index 속성 추가 (원래 순서 기억하기 위해)
for (let i = 0; i < totalSlides; i++) {
  container.children[i].setAttribute('data-index', i);
}

// 2. 점 색깔 바꾸는 함수 (현재 활성 슬라이드에 맞게)
function updateDots(activeIndex) {
  dots.forEach((dot, index) => {
    dot.style.backgroundColor = index === activeIndex ? '#ffffff' : 'rgba(18, 18, 18, 0.4)';
  });
}

// 3. 현재 화면에 보이는 슬라이드의 원래 인덱스 가져오기
function getCurrentIndex() {
  return Number(container.firstElementChild.getAttribute('data-index'));
}

// 4. 다음 슬라이드로 이동하는 함수
function moveNext() {
  if (isMoving) return; // 이동 중이면 중복 실행 방지
  isMoving = true;

  // 슬라이드 컨테이너를 왼쪽으로 100vw만큼 이동시키기 (트랜지션 효과)
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = `translateX(-${slideWidthVW}vw)`;

  // 애니메이션 끝나면 실행되는 코드
  container.addEventListener('transitionend', () => {
    // 첫 번째 슬라이드를 맨 뒤로 보낸다 (무한 반복 효과)
    container.appendChild(container.firstElementChild);

    // 트랜지션 없애고 위치 초기화 (원래 자리로)
    container.style.transition = 'none';
    container.style.transform = 'translateX(0vw)';

    // 점 색깔 업데이트 (현재 보이는 슬라이드 인덱스 기준)
    updateDots(getCurrentIndex());

    isMoving = false; // 이동 종료
  }, { once: true }); // 이벤트 리스너는 한 번만 실행
}

// 5. 이전 슬라이드로 이동하는 함수
function movePrev() {
  if (isMoving) return;
  isMoving = true;

  // 맨 마지막 슬라이드를 맨 앞으로 옮긴다 (시각적으로 점프 효과)
  container.insertBefore(container.lastElementChild, container.firstElementChild);

  // 트랜지션 없이 바로 왼쪽으로 100vw 이동된 상태로 세팅
  container.style.transition = 'none';
  container.style.transform = `translateX(-${slideWidthVW}vw)`;

  // 다음 프레임에서 트랜지션 주면서 0vw로 이동 (슬라이드 애니메이션)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.style.transition = 'transform 0.5s ease-in-out';
      container.style.transform = 'translateX(0vw)';
    });
  });

  // 애니메이션 끝나면 점 색깔 업데이트
  container.addEventListener('transitionend', () => {
    updateDots(getCurrentIndex());
    isMoving = false;
  }, { once: true });
}

// 6. 버튼 이벤트 연결
document.getElementById('next-btn').addEventListener('click', moveNext);
document.getElementById('prev-btn').addEventListener('click', movePrev);

// 7. 점(dot) 클릭 시 해당 슬라이드로 바로 이동
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;

    // 현재 첫 번째 슬라이드의 인덱스와 클릭한 점의 인덱스 차이 계산
    let currentIndex = getCurrentIndex();
    let diff = index - currentIndex;

    // 앞으로 이동할 때 (오른쪽 이동)
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        container.appendChild(container.firstElementChild);
      }
    }
    // 뒤로 이동할 때 (왼쪽 이동)
    else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        container.insertBefore(container.lastElementChild, container.firstElementChild);
      }
    }

    // 슬라이드 위치 초기화 & 점 업데이트
    container.style.transition = 'none';
    container.style.transform = 'translateX(0vw)';
    updateDots(index);
    isMoving = false;
  });
});

// 8. 처음 페이지 로드 시 첫 점 색깔 세팅
updateDots(0);


// 9. 자동 슬라이드 시작
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveNext();
  }, 5000); // 5초마다 다음 슬라이드
}

// 10. 초기 설정
updateDots(0);
startAutoSlide(); // 자동 슬라이드 시작!



// -----------section1 캐러셀------------------------------------
// 카테고리 버튼 눌렀을 시
const buttons = document.querySelectorAll('#category-buttons > li > button');
  const carousel = document.getElementById('section1-carousel-container');
  const slides = document.querySelectorAll('.slide');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const slide = slides[index];
      if (slide) {
        // slide의 왼쪽 위치를 기준으로 스크롤 이동
        carousel.scrollTo({
          left: slide.offsetLeft,
          behavior: 'smooth'
        });
      }
    });
  });

// 화살표 버튼 눌렀을 시
const container1 = document.getElementById("section1-carousel-container");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const slideWidth = () => container1.querySelector(".slide").offsetWidth + 20; // include gap

nextBtn.addEventListener("click", () => {
    container1.scrollBy({ left: slideWidth2(), behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
    container1.scrollBy({ left: -slideWidth2(), behavior: "smooth" });
});


});



// -----------------section3-타임특가-------------------------------


// -------------------footer----------------------------------

// 패밀리 사이트
  document.addEventListener("DOMContentLoaded", function () {
    const familyToggleButton = document.getElementById("family-toggle-btn");
    const familyMenuList = document.getElementById("family-site-menu");

    familyToggleButton.addEventListener("click", function (e) {
      e.stopPropagation();
      familyMenuList.classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest("#footer-family-site")) {
        familyMenuList.classList.add("hidden");
      }
    });
  });



  