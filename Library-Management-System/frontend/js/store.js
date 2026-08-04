// ================= STORE DATA & INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initCategoryFilter();
  initCart();
});

// ================= REAL-TIME SEARCH =================
function initSearch() {
  const searchInput = document.getElementById("search");
  const bookCards = document.querySelectorAll(".books .card");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    bookCards.forEach((card) => {
      const title = card.querySelector("h2").textContent.toLowerCase();
      const author = card.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// ================= CATEGORY FILTERING =================
function initCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".categories .category");
  const bookCards = document.querySelectorAll(".books .card");

  // Category mapping based on book titles/authors for demo functionality
  const bookCategories = {
    "Atomic Habits": "Self Help",
    "Rich Dad Poor Dad": "Finance",
    "The Alchemist": "Novel",
    "Python Crash Course": "Programming",
    "Clean Code": "Programming",
    "Deep Work": "Psychology",
    "Sapiens": "History",
    "1984": "Novel"
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Toggle active class on buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedCategory = button.textContent.trim();

      bookCards.forEach((card) => {
        const title = card.querySelector("h2").textContent.trim();
        const cardCategory = bookCategories[title];

        if (selectedCategory === "All" || cardCategory === selectedCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ================= SHOPPING CART =================
function initCart() {
  const cartButtons = document.querySelectorAll(".card .cart");
  const cartCountEl = document.getElementById("cartCount");

  // Load existing cart count from localStorage
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCountEl.textContent = cartCount;

  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      localStorage.setItem("cartCount", cartCount);

      // Visual feedback feedback on button click
      const originalContent = button.innerHTML;
      button.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      button.style.backgroundColor = "#10b981";

      setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.backgroundColor = "";
      }, 1500);
    });
  });
}