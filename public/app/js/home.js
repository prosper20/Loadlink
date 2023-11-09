// Get references to the modal and buttons
const modal = document.getElementById("tripModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Show the modal when the "Post a Trip" link is clicked
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Hide the modal when the close button is clicked
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Hide the modal when the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
