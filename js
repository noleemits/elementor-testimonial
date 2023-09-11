document.addEventListener("DOMContentLoaded", () => {
  const bioWrappers = document.querySelectorAll(".tab-testimonial-bio-wrapper");
  const bioWrappersImg = document.querySelectorAll(".tab-testimonial-bio-wrapper .elementor-widget-image");
  const bioContents = document.querySelectorAll(".tab-testimonial-bio-content");
  const bioTriangles = document.querySelectorAll(".tab-testimonial-triangle");

  // Function to close all bioContents and reset the "active" class
  function closeAllBioContents() {
    bioContents.forEach((content, index) => {
      content.style.display = "none";
      bioTriangles[index].style.display = "none"; // Hide the corresponding triangle
      bioWrappersImg[index].classList.add("active"); // Add "active" class
    });
  }

  // Function to reset the height of bioWrappers
  function resetBioHeight() {
    bioWrappers.forEach((wrapper) => {
      wrapper.style.height = "";
    });
  }

  // Function to open bioContent
  function openBioContent(index) {
    const content = bioContents[index];
    const wrapper = bioWrappers[index];
    const img = bioWrappersImg[index];

    if (content.style.display === "none" || content.style.display === "") {
      closeAllBioContents();
      resetBioHeight();

      // Calculate the distance from the wrapper to the tab-testimonial-bio-wrapper
      const distance = wrapper.getBoundingClientRect().top - wrapper.parentElement.getBoundingClientRect().top;
      
      content.style.display = "block";
      bioTriangles[index].style.display = "block"; // Show the corresponding triangle
      img.classList.remove("active"); // Remove "active" class

      // Adjust the top position of the content element
      content.style.top = `${distance + wrapper.offsetHeight - 10}px`;
      
      // Set the height of the wrapper to accommodate the content
      wrapper.style.height = `${wrapper.offsetHeight + content.offsetHeight}px`;
    }
  }

  bioWrappers.forEach((wrapper, index) => {
    wrapper.addEventListener("click", () => {
      openBioContent(index);
    });

    const closeElement = wrapper.querySelector(".tab-testimonial-close");
    if (closeElement) {
      closeElement.addEventListener("click", (event) => {
        event.stopPropagation();
        bioContents[index].style.display = "none";
        bioTriangles[index].style.display = "none"; // Hide the corresponding triangle
        bioWrappersImg[index].classList.add("active"); // Add "active" class
        bioWrappers[index].style.height = ""; // Reset the height of the wrapper
      });
    }
  });

  // Add "active" class to all bioWrappersImg initially since their contents are not visible
  bioWrappersImg.forEach((img) => {
    img.classList.add("active");
  });

  // Close all bioContents initially
  closeAllBioContents();

    // Add window resize event listener to close content on resize
  let prevWindowWidth = window.innerWidth;

  // Add window resize event listener to close content on resize (with a minimum resize threshold of 40px)
  window.addEventListener("resize", () => {
    const currentWindowWidth = window.innerWidth;
    if (Math.abs(currentWindowWidth - prevWindowWidth) > 100) {
      closeAllBioContents();
      resetBioHeight();
    }
    prevWindowWidth = currentWindowWidth;
  });
});
