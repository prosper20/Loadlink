document.addEventListener("DOMContentLoaded", function () {
  const experiences = document.querySelectorAll(".experience");
  let currentExperienceIndex = 0;

  function showExperience(index) {
    experiences.forEach((experience, i) => {
      experience.style.display = i === index ? "block" : "none";
      experience.style.width = "98%";
    });
  }

  document.querySelector(".next").addEventListener("click", function () {
    currentExperienceIndex = (currentExperienceIndex + 1) % experiences.length;
    showExperience(currentExperienceIndex);
  });

  document.querySelector(".prev").addEventListener("click", function () {
    currentExperienceIndex =
      (currentExperienceIndex - 1 + experiences.length) % experiences.length;
    showExperience(currentExperienceIndex);
  });
});
