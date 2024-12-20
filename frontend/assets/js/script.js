document.addEventListener('DOMContentLoaded', function() {
  const pages = document.querySelectorAll('.commands-page');
  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const currentPageSpan = document.getElementById('currentPage');
  let currentPage = 1;

  pages[0].classList.add('active');

  function showPage(pageNumber) {
    pages.forEach(page => page.classList.remove('active'));
    pages[pageNumber - 1].classList.add('active');
    currentPageSpan.textContent = pageNumber;
    currentPage = pageNumber;

    prevButton.style.visibility = pageNumber === 1 ? 'hidden' : 'visible';
    nextButton.style.visibility = pageNumber === pages.length ? 'hidden' : 'visible';
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < pages.length) {
      showPage(currentPage + 1);
    }
  });

  showPage(1);
}); 

