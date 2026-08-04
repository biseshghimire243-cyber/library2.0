document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".cat-btn");
    const bookCards = document.querySelectorAll(".book-card");

    const modal = document.getElementById("bookModal");
    const closeModal = document.getElementById("closeModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const modalCategory = document.getElementById("modalBadge");
    const modalRating = document.getElementById("modalRating");
    const modalDesc = document.getElementById("modalDesc");

    let currentCategory = "all";

    // Filter Books Function
    function filterBooks() {
        const query = searchInput.value.toLowerCase().trim();

        bookCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            const matchesCategory = currentCategory === "all" || category === currentCategory.toLowerCase();
            const matchesSearch = title.includes(query) || author.includes(query) || category.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Category Button Click Handler
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            filterBooks();
        });
    });

    // Search Input Event
    searchInput.addEventListener("input", filterBooks);

    // Open Modal
    bookCards.forEach(card => {
        card.querySelector(".view-btn").addEventListener("click", () => {
            modalImg.src = card.dataset.img;
            modalTitle.textContent = card.dataset.title;
            modalAuthor.textContent = card.dataset.author;
            modalCategory.textContent = card.dataset.category;
            modalRating.textContent = card.dataset.rating;
            modalDesc.textContent = card.dataset.desc;

            modal.style.display = "flex";
        });
    });

    // Close Modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});