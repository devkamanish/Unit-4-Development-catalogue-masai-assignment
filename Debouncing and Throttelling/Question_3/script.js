    let currentSlide = 1;
    let lastClickTime = 0;
    let clickCount = 0;
    const imgElement = document.getElementById('slider');
    const slideNumber = document.getElementById('slideNumber');

    function updateImage() {
      imgElement.src = `https://picsum.photos/600/400?random=${Date.now()}`;
      slideNumber.textContent = `Slide ${currentSlide}`;
    }

    function throttleNavigation(change) {
      const now = Date.now();
      const timeDiff = now - lastClickTime;

      if (timeDiff < 1000) {
        clickCount++;
        if (clickCount > 3) {
          alert("Chill chill, loading it!!");
          return;
        }
      } else {
        clickCount = 1; // reset if more than 1 second has passed
      }

      if (timeDiff >= 1000 || lastClickTime === 0) {
        currentSlide += change;
        if (currentSlide < 1) currentSlide = 1;
        updateImage();
        lastClickTime = now;
      }
    }

    function nextSlide() {
      throttleNavigation(1);
    }

    function prevSlide() {
      throttleNavigation(-1);
    }
