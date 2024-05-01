document.addEventListener('DOMContentLoaded', () => {
  let images = document.querySelectorAll('img');
  let timerId;
  
  images.forEach(image => {
    image.addEventListener('mouseenter', (e) => {
      timerId = setTimeout(() => {
        e.target.parentElement.querySelector('figcaption').style.display = 'block';
      }, 2000);
    });
    
    image.addEventListener('mouseleave', (e) => {
      if (timerId) clearTimeout(timerId);
      e.target.parentElement.querySelector('figcaption').style.display = 'none';
    });
  });
})