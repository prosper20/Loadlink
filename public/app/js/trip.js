// script.js

document.addEventListener("DOMContentLoaded", function () {
  const expandButton = document.querySelector(".expandBtn");
  const userDetails = document.querySelector(".user-details");
  const userInfo = document.querySelector(".user-info");
  const expandLess = document.querySelector(".expand_less");
  const postedBy = document.querySelector(".expand_less > span");

  expandButton.addEventListener("click", function () {
    if (userDetails.style.top === "70%") {
      userDetails.style.top = "90%";
      userInfo.style.display = "none";
      expandLess.style.backgroundColor = "#fff";
      postedBy.style.display = "block";
      expandButton.textContent = "expand_less";
    } else {
      userDetails.style.top = "70%";
      userInfo.style.display = "flex";
      expandLess.style.backgroundColor = "#074061";
      postedBy.style.display = "none";
      expandButton.textContent = "expand_more";
    }
  });
});
