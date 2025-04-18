//<![CDATA[
(function(){
  const processImage = (img) => {
    if(!img.src.includes('blogger')) return;
    
    const params = new URLSearchParams({
      format: 'webp',
      quality: 85,
      resize: Math.min(img.parentElement.offsetWidth, 1920)
    });
    
    const newSrc = `${img.src.split('?')[0]}?${params}`;
    
    img.loading = 'lazy';
    img.decoding = 'async';
    img.classList.add('optimized-image');
    
    const tempImg = new Image();
    tempImg.src = newSrc;
    tempImg.onload = () => {
      img.src = newSrc;
      img.classList.add('loaded');
    };
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        processImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {rootMargin: '500px'});

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.post-body img').forEach(img => {
      observer.observe(img);
    });
  });
})();
//]]>
