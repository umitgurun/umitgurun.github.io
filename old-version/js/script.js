const toggleSearchBar = document.getElementById("toggleSearchBar");
const floatingSearchBar = document.getElementById("floatingSearchBar");
const backdrop = document.getElementById("backdrop");
const body = document.body;

// Function to toggle search bar and backdrop visibility
const toggleSearchBarVisibility = () => {
  const isActive = body.classList.contains("search-active");
  if (isActive) {
    body.classList.remove("search-active");
    floatingSearchBar.classList.remove("visible");
    backdrop.classList.remove("visible");
  } else {
    body.classList.add("search-active");
    floatingSearchBar.classList.add("visible");
    backdrop.classList.add("visible");
  }
};

// Event listener for the toggle button
toggleSearchBar.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event bubbling
  toggleSearchBarVisibility();
});

// Event listener for clicks outside the search bar and backdrop
document.addEventListener("click", (event) => {
  if (
    !floatingSearchBar.contains(event.target) &&
    event.target !== toggleSearchBar
  ) {
    body.classList.remove("search-active");
    floatingSearchBar.classList.remove("visible");
    backdrop.classList.remove("visible");
  }
});

// Backdrop click event to close the search bar
backdrop.addEventListener("click", () => {
  body.classList.remove("search-active");
  floatingSearchBar.classList.remove("visible");
  backdrop.classList.remove("visible");
});
