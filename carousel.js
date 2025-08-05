
    let position = 0;
    const carousel = document.getElementById("carousel");
    const cards = document.querySelectorAll(".project-card");
    const cardWidth = cards[0].offsetWidth + 20; // card width + margin
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const totalCards = cards.length;

    // Calculate max scroll position
    const carouselWidth = totalCards * cardWidth;
    const maxScroll = carouselWidth - containerWidth;

    function slide(direction) {
      // For mobile devices (screen width less than 768px)
      if (window.innerWidth < 768) {
        position += direction * cardWidth;

        // Center the active card on mobile
        const centerOffset = (containerWidth - cardWidth) / 2;
        position = Math.max(0, Math.min(position, maxScroll));

        // Snap to card positions
        const cardIndex = Math.round(position / cardWidth);
        position = cardIndex * cardWidth;

        // Apply smooth transition
        carousel.style.transition = "transform 0.3s ease-in-out";
        carousel.style.transform = `translateX(-${position}px)`;

        // Remove transition after it's done to prevent dragging effects
        setTimeout(() => {
          carousel.style.transition = "none";
        }, 300);
      }
      // For desktop (original behavior)
      else {
        position += direction * cardWidth * 3; // Move 3 cards at a time on desktop
        if (position < 0) position = 0;
        if (position > maxScroll) position = maxScroll;
        carousel.style.transform = `translateX(-${position}px)`;
      }
    }

    // Handle window resize to recalculate dimensions
    window.addEventListener('resize', function () {
      const newCardWidth = cards[0].offsetWidth + 20;
      if (newCardWidth !== cardWidth) {
        // Recalculate position based on new card width
        position = Math.round(position / cardWidth) * newCardWidth;
        carousel.style.transform = `translateX(-${position}px)`;
      }
    });
  