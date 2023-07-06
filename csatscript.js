window.addEventListener('DOMContentLoaded', function() {
  var slides = document.querySelectorAll('.slide');
  var currentSlide = 0;

  function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  showSlide(currentSlide);

  // 다음/이전 버튼 클릭 이벤트 처리
  var prevBtn = document.createElement('button');
  prevBtn.innerText = '이전';
  prevBtn.addEventListener('click', prevSlide);
  document.body.appendChild(prevBtn);

  var nextBtn = document.createElement('button');
  nextBtn.innerText = '다음';
  nextBtn.addEventListener('click', nextSlide);
  document.body.appendChild(nextBtn);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
});
