// 헤더 기능 수정 - 네비게이션바
let lastScrollTop = 0; // 마지막 스크롤 위치 저장
const header = document.getElementById('header'); // 헤더 요소
const navLinks = document.getElementById('navLinks'); // 네비게이션 링크

window.addEventListener('scroll', function () {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // 메인페이지 최상단일 때 (스크롤 값이 0일 때)
  if (currentScroll === 0) {
    header.classList.remove('hidden'); // 헤더 보임
    // navLinks.classList.add('hidden'); // 네비게이션 링크 숨김
  } else {
    navLinks.classList.remove('hidden'); // 스크롤을 내리면 네비게이션 링크 보임

    // 스크롤 다운 시 헤더를 유지하고, 스크롤 업 시 헤더를 숨김
    if (currentScroll > lastScrollTop) {
      header.classList.remove('hidden'); // 스크롤 다운 시 헤더 보임
    } else {
      header.classList.add('hidden'); // 스크롤 업 시 헤더 숨김
    }
  }

  lastScrollTop = currentScroll; // 마지막 스크롤 위치 업데이트
});

// 페이지 로드 시 초기 상태 설정
window.addEventListener('load', function () {
  const header = document.querySelector('.header');
  header.classList.remove('scrolled'); // 페이지 로드 시 투명하게 유지
});

// 메인 기능 처리
document.addEventListener('DOMContentLoaded', function () {
  // 메인 슬라이드 자동 재생
  const slider = document.getElementById('main-slider');
  const slides = slider.children;
  let currentIndex = 0;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  setInterval(showNextSlide, 3000);

  // 드롭다운 버튼 클릭 처리
  const dropdown = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  dropdown.addEventListener('click', function () {
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

  // 페이지 슬라이드 전환 처리
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const playPauseButton = document.getElementById('playPauseButton');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const currentSlide = document.getElementById('currentSlide');
  const totalSlides = document.getElementById('totalSlides');

  let isPlaying = true;
  let slideIndex = parseInt(currentSlide.textContent);
  const total = parseInt(totalSlides.textContent);

  function updateSlideIndex() {
    currentSlide.textContent = slideIndex.toString().padStart(2, '0');
  }

  prevButton.addEventListener('click', function () {
    slideIndex = slideIndex > 1 ? slideIndex - 1 : total;
    updateSlideIndex();
  });

  nextButton.addEventListener('click', function () {
    slideIndex = slideIndex < total ? slideIndex + 1 : 1;
    updateSlideIndex();
  });

  playPauseButton.addEventListener('click', function () {
    isPlaying = !isPlaying;
    playPauseIcon.src = isPlaying
      ? 'https://d13zo8jzfzdg6k.cloudfront.net/partners-v1/production/static/admin/_/img/loginpage/introduction/icon/ic-stop.svg'
      : 'https://d13zo8jzfzdg6k.cloudfront.net/partners-v1/production/static/admin/_/img/loginpage/introduction/icon/ic-play.svg';
  });

  // 메인섹션1 아이콘 클릭시 슬라이드 이미지 전환
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('main-slider'); // 슬라이드 컨테이너
    const slides = slider.children; // 슬라이드 이미지 목록
    const totalSlides = slides.length; // 총 슬라이드 개수
    let currentIndex = 0; // 현재 슬라이드 인덱스
    let isPlaying = true; // 슬라이드 자동 재생 상태
    let slideInterval; // 자동 재생 간격 변수

    // 슬라이드를 표시하는 함수
    function showSlide(index) {
      // 슬라이드의 범위를 넘어가지 않도록 처리
      if (index >= totalSlides) {
        currentIndex = 0; // 마지막 슬라이드에서 처음으로 돌아감
      } else if (index < 0) {
        currentIndex = totalSlides - 1; // 첫 슬라이드에서 마지막으로 이동
      } else {
        currentIndex = index;
      }

      // 슬라이드를 전환하는 CSS 트랜스폼
      slider.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // 이전 슬라이드로 이동
    document
      .getElementById('prevButton')
      .addEventListener('click', function () {
        showSlide(currentIndex - 1);
      });

    // 다음 슬라이드로 이동
    document
      .getElementById('nextButton')
      .addEventListener('click', function () {
        showSlide(currentIndex + 1);
      });

    // 슬라이드 자동 재생 함수
    function startAutoSlide() {
      slideInterval = setInterval(function () {
        showSlide(currentIndex + 1);
      }, 3000); // 3초마다 자동 슬라이드
    }

    // 자동 재생을 멈추거나 재개하는 함수
    function togglePlayPause() {
      if (isPlaying) {
        clearInterval(slideInterval); // 자동 재생 멈춤
        document.getElementById('playPauseIcon').src =
          'https://d13zo8jzfzdg6k.cloudfront.net/partners-v1/production/static/admin/_/img/loginpage/introduction/icon/ic-play.svg'; // 아이콘 변경
      } else {
        startAutoSlide(); // 자동 재생 시작
        document.getElementById('playPauseIcon').src =
          'https://d13zo8jzfzdg6k.cloudfront.net/partners-v1/production/static/admin/_/img/loginpage/introduction/icon/ic-stop.svg'; // 아이콘 변경
      }
      isPlaying = !isPlaying;
    }

    // 재생/일시정지 버튼 클릭 시 동작
    document
      .getElementById('playPauseButton')
      .addEventListener('click', togglePlayPause);

    // 페이지 로드 시 자동 슬라이드 시작
    startAutoSlide();
  });

  // 시작하기 버튼 PDF 설정
  document.getElementById('startButton').addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = 'img/펫플루언서 회사제안서.pdf'; // PDF 파일의 경로를 입력
    link.download = '펫플루언서 회사제안서.pdf'; // 다운로드될 파일명
    link.click();
  });

  // 메인 섹션 3 이미지 스크롤 애니메이션 처리
  const mainImg1 = document.getElementById('main-img-1');
  const smallImg1_1 = document.getElementById('small-img-1-1');

  function handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const mainImg1Position =
      mainImg1.getBoundingClientRect().top + window.scrollY;

    if (scrollPosition > mainImg1Position) {
      mainImg1.classList.add('visible');
      smallImg1_1.classList.add('visible');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

// // 네이버 블로그 기능
// // 네이버 블로그의 RSS 피드에서 데이터를 가져오는 함수
// async function fetchRSS() {
//   try {
//     // RSS 피드를 가져오기
//     async function fetchNaverImages(query) {
//       const clientId = '{PJqfjeqNGnG9YeVH_uSe}';
//       const clientSecret = '{FlBhImpHmR}';

//       try {
//         const response = await fetch(
//           `https://openapi.naver.com/v1/search/image.xml?query=${encodeURIComponent(
//             query
//           )}&display=10&start=1&sort=sim`,
//           {
//             method: 'GET',
//             headers: {
//               'X-Naver-Client-Id': clientId,
//               'X-Naver-Client-Secret': clientSecret,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error('이미지 데이터를 가져오는 중 오류가 발생했습니다.');
//         }

//         const xmlText = await response.text();
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

//         const items = xmlDoc.querySelectorAll('item');
//         const imageContainer = document.getElementById('image-results');

//         // 기존의 이미지 목록 제거
//         imageContainer.innerHTML = '';

//         // 각 이미지 데이터를 HTML로 변환하여 화면에 추가
//         items.forEach((item) => {
//           const title = item.querySelector('title').textContent;
//           const imageUrl = item.querySelector('thumbnail').textContent;
//           const link = item.querySelector('link').textContent;

//           // 이미지 및 제목을 위한 div 생성
//           const imageElement = document.createElement('div');
//           imageElement.classList.add('image-item');

//           // HTML로 이미지 및 제목 구성
//           imageElement.innerHTML = `
//             <a href="${link}" target="_blank">
//               <img src="${imageUrl}" alt="${title}" />
//             </a>
//             <p>${title}</p>
//           `;

//           // 컨테이너에 추가
//           imageContainer.appendChild(imageElement);
//         });
//       } catch (error) {
//         console.error('이미지 데이터를 불러오는 중 오류 발생:', error);
//       }
//     }

//     // 페이지가 로드될 때 기본 검색어로 이미지를 가져오기
//     window.onload = function () {
//       fetchNaverImages('주식'); // 기본 검색어를 '주식'으로 설정
//     };

//     const text = await response.text();

//     // XML 데이터를 파싱하기
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(text, 'application/xml');

//     // <item> 태그를 모두 선택 (블로그 글 목록)
//     const items = xml.querySelectorAll('item');
//     const blogContainer = document.getElementById('blog-posts');

//     // 기존의 블로그 글들 제거
//     blogContainer.innerHTML = '';

//     // 각 블로그 글을 HTML로 변환하여 화면에 추가
//     items.forEach((item, index) => {
//       const title = item.querySelector('title').textContent;
//       const link = item.querySelector('link').textContent;
//       const pubDate = new Date(
//         item.querySelector('pubDate').textContent
//       ).toLocaleDateString();

//       // 기본 썸네일 이미지 사용
//       const thumbnail = 'https://via.placeholder.com/150';

//       // 블로그 포스트를 위한 div 생성
//       const post = document.createElement('div');
//       post.classList.add('blog-post');

//       // HTML로 블로그 글 구성
//       post.innerHTML = `
//           <img src="${thumbnail}" alt="Blog Thumbnail ${index + 1}" />
//           <a href="${link}" target="_blank">
//             <strong class="blog-title">${title}</strong>
//           </a>
//           <p>게시일: ${pubDate}</p>
//         `;

//       // 컨테이너에 추가
//       blogContainer.appendChild(post);
//     });
//   } catch (error) {
//     console.error('RSS 피드를 불러오는 중 오류 발생:', error);
//   }
// }

// // 페이지가 로드될 때 RSS 피드 가져오기
// window.onload = fetchRSS;

// 섹션1 문의하기 (보라)버튼 ->섹션6 문의하기 상단 바로이동

document.addEventListener('DOMContentLoaded', function () {
  // '문의하기' 버튼 클릭 시 섹션 6으로 스크롤 이동
  const inquiryButton = document.getElementById('inquiry-button');
  const contactSection = document.getElementById('anchor-sec-contact');

  inquiryButton.addEventListener('click', function () {
    contactSection.scrollIntoView({
      behavior: 'smooth', // 부드러운 스크롤
      block: 'start', // 섹션 6이 페이지의 상단에 위치하도록 설정
    });
  });

  const logoImg = document.getElementById('logoimg');
  const totop = document.getElementById('contact-section');
  console.log(logoImg);

  logoImg.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});

// 고객문의 페이지 modal 및 google spredsheet
document
  .getElementById('inquiry-form')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // 폼 기본 제출 동작을 막음

    // 폼 데이터 가져오기
    const companyName = document.getElementById('company-name').value;
    const personInCharge = document.getElementById('person-in-charge').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const referralSource = document.getElementById('referral-source').value;
    const inquiries = document.getElementById('inquiries').value;

    // Google Apps Script로 전송할 데이터
    const data = {
      companyName: companyName,
      personInCharge: personInCharge,
      contact: contact,
      email: email,
      referralSource: referralSource,
      inquiries: inquiries,
    };

    // Google Apps Script의 웹 애플리케이션 URL
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbyt-eEkwV9HUwiXcu4FF1uG9F9gbvOr2HQK3uo-bZQI1B3L5PVnJRCLFVgzaKd-XVgS/exec';

    // 데이터 전송
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // CORS 모드로 설정
    })
      .then((response) => response.json()) // 응답을 JSON으로 변환
      .then((data) => {
        console.log('Success:', data);
        if (data.result === 'success') {
          // 성공적으로 전송되면 모달을 표시
          const modal = new bootstrap.Modal(document.getElementById('myModal'));
          modal.show();
        } else {
          alert('데이터 전송에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('오류가 발생했습니다.');
      });
  });
