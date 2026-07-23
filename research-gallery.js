/* =========================================================
   Top research-image gallery
   ========================================================= */

const researchGallery =
  document.querySelector("[data-research-gallery]");

if (researchGallery) {
  const galleryTrack =
    researchGallery.querySelector(
      "[data-gallery-track]"
    );

  const gallerySlides = Array.from(
    galleryTrack?.querySelectorAll(
      ".research-gallery-slide"
    ) ?? []
  );

  const previousButton =
    researchGallery.querySelector(
      "[data-gallery-previous]"
    );

  const nextButton =
    researchGallery.querySelector(
      "[data-gallery-next]"
    );

  const dots = Array.from(
    researchGallery.querySelectorAll(
      ".research-gallery-dot"
    )
  );

  const currentImageElement =
    researchGallery.querySelector(
      "[data-current-gallery-image]"
    );

  const totalImagesElement =
    researchGallery.querySelector(
      "[data-total-gallery-images]"
    );

  let currentImage = 0;

  if (totalImagesElement) {
    totalImagesElement.textContent =
      String(gallerySlides.length);
  }

  function showImage(index) {
    if (!galleryTrack || gallerySlides.length === 0) {
      return;
    }

    if (index < 0) {
      currentImage = gallerySlides.length - 1;
    } else if (index >= gallerySlides.length) {
      currentImage = 0;
    } else {
      currentImage = index;
    }

    galleryTrack.style.transform =
      `translateX(-${currentImage * 100}%)`;

    gallerySlides.forEach((slide, slideIndex) => {
      slide.setAttribute(
        "aria-hidden",
        String(slideIndex !== currentImage)
      );
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentImage;

      dot.classList.toggle(
        "active",
        isActive
      );

      if (isActive) {
        dot.setAttribute(
          "aria-current",
          "true"
        );
      } else {
        dot.removeAttribute(
          "aria-current"
        );
      }
    });

    if (currentImageElement) {
      currentImageElement.textContent =
        String(currentImage + 1);
    }
  }

  previousButton?.addEventListener(
    "click",
    () => {
      showImage(currentImage - 1);
    }
  );

  nextButton?.addEventListener(
    "click",
    () => {
      showImage(currentImage + 1);
    }
  );

  dots.forEach((dot, index) => {
    dot.addEventListener(
      "click",
      () => {
        showImage(index);
      }
    );
  });

  /* Keyboard navigation */
  researchGallery.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(currentImage - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(currentImage + 1);
      }
    }
  );

  /* Swipe navigation on phones */
  let touchStartX = 0;
  let touchEndX = 0;

  galleryTrack?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX =
        event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  galleryTrack?.addEventListener(
    "touchend",
    (event) => {
      touchEndX =
        event.changedTouches[0].screenX;

      const swipeDistance =
        touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < 50) {
        return;
      }

      if (swipeDistance > 0) {
        showImage(currentImage + 1);
      } else {
        showImage(currentImage - 1);
      }
    },
    { passive: true }
  );

  showImage(0);
}
