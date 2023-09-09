document.addEventListener("DOMContentLoaded", () => {
  
const bioWrappers = document.querySelectorAll(".tab-testimonial-bio-wrapper");
const bioContents = document.querySelectorAll(".tab-testimonial-bio-content");
const bioTriangles = document.querySelectorAll(".tab-testimonial-triangle");

function closeAllBioContents() {
  bioContents.forEach((content, index) => {
    content.style.display = "none";
    bioTriangles[index].style.display = "none"; // Hide the corresponding triangle
  });
}

function resetBioHeight() {
  bioWrappers.forEach((wrapper) => {
    wrapper.style.height = "";
  });
}

function openBioContent(index) {
  const content = bioContents[index];
  const wrapper = bioWrappers[index];

  if (content.style.display === "none" || content.style.display === "") {
    closeAllBioContents();
    resetBioHeight();

    // Calculate the distance from the wrapper to the tab-testimonial-bio-wrapper
    const distance = wrapper.getBoundingClientRect().top - wrapper.parentElement.getBoundingClientRect().top;
    
    content.style.display = "block";
    bioTriangles[index].style.display = "block"; // Show the corresponding triangle

    // Adjust the top position of the content element
    content.style.top = `${distance + wrapper.offsetHeight - 10}px`;
    
    // Set the height of the wrapper to accommodate the content
    wrapper.style.height = `${wrapper.offsetHeight + content.offsetHeight }px`;
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
      bioWrappers[index].style.height = "";
    });
  }
});

closeAllBioContents();


});
