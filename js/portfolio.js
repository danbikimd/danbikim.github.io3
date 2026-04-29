
// 페이지 전체 로드 후에 작동하도록
window.addEventListener("load", () => {


  // top버튼 main태그에서는 안보이게------------------------------------
const topBtn = document.querySelector("#top-btn");
const main = document.querySelector("#main");

let observer = new IntersectionObserver((entries2) => {
  entries2.forEach((entry) => {
    if (entry.isIntersecting) {
      // main이 화면에 보일 때 → 버튼 숨김
      topBtn.style.display = "none";
    } else {
      // main이 벗어나면 → 버튼 다시 보임
      topBtn.style.display = "block";
    }
  });
});

observer.observe(main);

// 라이트-다크모드 적용-------------------------------------------------
const toggleBtn = document.getElementById("light-dark-btn");
const themeIcon = document.getElementById("light-dark-image");
const container = document.querySelector("body");

// 비디오 관련 요소
// main 비디오
const themeVideo = document.getElementById("themeVideo");
const videoSource = document.getElementById("videoSource");

// section6비디오
// const themeVideo2 = document.getElementById("themeVideo2");
// const videoSource2 = document.getElementById("videoSource2");

// 초기 상태는 다크모드
let themeState = "dark";
container.classList.add("dark-theme");
themeIcon.src = "images/light-dark-btn/sun.svg"; // 다크모드 → 태양 아이콘
videoSource.src = "images/lottie_mp4/title4.mp4";
themeVideo.load();
// videoSource2.src = "images/section6-loop-band/loop-band-4.mp4";
// themeVideo2.load();

// 모드전환
toggleBtn.addEventListener("click", () => {
  container.classList.remove("light-theme", "dark-theme");

  if (themeState === "dark") {
    container.classList.add("light-theme");
    themeIcon.src = "images/light-dark-btn/moon.svg"; // 라이트모드 → 달 아이콘
    videoSource.src = "images/lottie_mp4/title-light-mode.mp4"; // 라이트 모드 비디오 main
    // videoSource2.src = "images/section6-loop-band/loop-band-light-mode.mp4"; // 라이트 모드 비디오 section6
    themeState = "light";
  } else if (themeState === "light") {
    container.classList.add("dark-theme");
    themeIcon.src = "images/light-dark-btn/sun.svg"; // 다시 태양 아이콘

    videoSource.src = "images/lottie_mp4/lottie_mp4"; // 다크 모드 비디오 main

    // videoSource2.src = "images/section6-loop-band/loop-band-4.mp4"; // 다크 모드 비디오 s6
    themeState = "dark";
  }
  themeVideo.load(); // src 변경 후 새로 불러오기
  // themeVideo2.load();
});

// ----------------main 비디오 2초 딜레이 반복 재생 기능---

themeVideo.addEventListener("ended", () => {
  setTimeout(() => {
    themeVideo.currentTime = 0;
    themeVideo.play();
  }, 2000);
});

// -----------------section1---------------------

// 섹션1컨테이너 스크롤 애니메이션

// 이미지 대상
const targetImg = document.querySelector("#section1 > div img");

const observerImg = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observerImg.observe(targetImg);

// 왼쪽 p 대상
const targetText1 = document.querySelector("#section1 > div p:first-of-type");

const observerText1 = new IntersectionObserver(
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

observerText1.observe(targetText1);

// 오른쪽 p 대상
const targetText2 = document.querySelector("#section1>div>p:last-of-type");

const observerText2 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active3");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText2.observe(targetText2);

// -----------------section2------------------------------------------------

/* 제목-스크롤애니메이션 */
const targetText4 = document.querySelector("#section2>div>h2");

const observerText4 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active4");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1 }
);

observerText4.observe(targetText4);

/* profile-box-스크롤애니메이션 */
const targetText5 = document.querySelector("#section2>div>div");

const observerText5 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active5");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

observerText5.observe(targetText5);

/* basic-information-스크롤애니메이션 */
const targetText6 = document.querySelector(".basic-information");

const observerText6 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active6");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

observerText6.observe(targetText6);

// -----------------section3-skill------------------------------------------------

/* design-skill- 스크롤 애니메이션*/
const targetText7 = document.querySelector("#section3>div>ul:first-child");

const observerText7 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active7");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText7.observe(targetText7);

/* coding-skill- 스크롤 애니메이션*/
const targetText8 = document.querySelector("#section3>div>ul:nth-of-type(2)");

const observerText8 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active8");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText8.observe(targetText8);

// -----------------section4-----------------------------------------------

/* 제목-web design - 스크롤 애니메이션*/
const targetText9 = document.querySelector("#section4 h3");

const observerText9 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active9");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1 }
);

observerText9.observe(targetText9);

/*-web-project-box-스크롤 애니메이션 */
const targetText10 = document.querySelector("#section4>div:nth-of-type(2)>div");

const observerText10 = new IntersectionObserver(
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

observerText10.observe(targetText10);

// -----------------section5-----------------------------------------------

/* 제목-uiux design-스크롤 애니메이션 */
const targetText11 = document.querySelector("#section5 h2");

const observerText11 = new IntersectionObserver(
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

observerText11.observe(targetText11);

/* ulux-project-box-스크롤 애니메이션*/
const targetText12 = document.querySelector("#section5-container>div");

const observerText12 = new IntersectionObserver(
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

observerText12.observe(targetText12);

// -----------------section7-----------------------------------------------

/* Branding & Detailed Pages - 제목-스크롤애니메이션 */
const targetText13 = document.querySelector("#section7 h3");

const observerText13 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active13");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText13.observe(targetText13);

/* project-container -스크롤 애니메이션  */
const targetText14 = document.querySelector("#section7>div>ul");

const observerText14 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active14");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText14.observe(targetText14);

// -----------------section8-----------------------------------------------

/* Thank you for Watching!  */
const targetText15 = document.querySelector("#in-tablet>p");

const observerText15 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active15");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observerText15.observe(targetText15);

/* 프로필 다시보기 버튼 - 스크롤 애니메이션 */
const targetText16 = document.querySelector("#profile-replay-btn");

const observerText16 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active16");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

observerText16.observe(targetText16);


// ------------section6---무한으로 띠 흐르게-----------------

// blue- band 
  const scrollContainer = document.getElementById('scrollContent');

  const unit = `
    <span>
      <ul>
        <li>CREATIVE <br>VIBES <br>ONLY</li>
        <li><img src="images/section6-loop-band/blue-band-union-icn.svg" alt="blue-band-union-icn"></li>
        <li>PORTFOLIO OF DANBI — DESIGN IS MY LANGUAGE</li>
        <li><img src="images/section6-loop-band/blue-band-duble-circle-icon.svg" alt="blue-band-duble-circle-icon"></li>
        <li>WELCOME TO MY CREATIVE UNIVERSE !</li>
        <li><img src="images/section6-loop-band/blue-band-ufo-con.svg" alt=""></li>
      </ul>
    </span>
  `;

  // 콘텐츠 끊김 없이 이어지게 최소 2회 이상 반복
  scrollContainer.innerHTML = unit + unit + unit;


  // yellow-band
  const scrollContainer2 = document.getElementById('scrollContent2');

  const unit2 = `
    <span>
                    <ul>
                        <li>ALWAYS CURIOUS, ALWAYS CREATING</li>
                        <li><img src="images/section6-loop-band/yellow-band-clover-icon.svg" alt="yellow-band-clover-icon"></li>
                        <li>FROM IDEA TO REALITY — WITH STYLE</li>
                        <li><img src="images/section6-loop-band/yellow-band-star-icon.svg" alt="yellow-band-star-icon"></li>
                        <li>CREATIVE VIBES ONLY</li>
                        <li><img src="images/section6-loop-band/yellow-band-smile-icon.svg" alt="yellow-band-smile-icon"></li>
                    </ul>
                </span>
  `;

  // 콘텐츠 끊김 없이 이어지게 최소 2회 이상 반복
  scrollContainer2.innerHTML = unit2 + unit2 + unit2;


  
});



