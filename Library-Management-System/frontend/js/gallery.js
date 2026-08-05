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
    const reviewsList = document.getElementById("reviewsList");
const reviewName = document.getElementById("reviewName");
const reviewRating = document.getElementById("reviewRating");
const reviewText = document.getElementById("reviewText");
const submitReview = document.getElementById("submitReview");

let currentBook = "";

    const modalPublisher = document.getElementById("modalPublisher");
    const modalYear = document.getElementById("modalYear");
    const modalLanguage = document.getElementById("modalLanguage");
    const modalPages = document.getElementById("modalPages");
    const modalISBN = document.getElementById("modalISBN");
    const modalAvailable = document.getElementById("modalAvailable");

    let currentCategory = "all";

    // ===================================
    // BOOK INFORMATION DATABASE
    // ===================================

    const bookInfo = {

        "Atomic Habits":{
            publisher:"Avery Publishing",
            year:"2018",
            language:"English",
            pages:"320",
            isbn:"9780735211292",
            available:"15 Copies"
        },

        "Rich Dad Poor Dad":{
            publisher:"Plata Publishing",
            year:"1997",
            language:"English",
            pages:"336",
            isbn:"9781612680194",
            available:"10 Copies"
        },

        "The Alchemist":{
            publisher:"HarperOne",
            year:"1988",
            language:"English",
            pages:"208",
            isbn:"9780062315007",
            available:"12 Copies"
        },

        "Python Crash Course":{
            publisher:"No Starch Press",
            year:"2023",
            language:"English",
            pages:"544",
            isbn:"9781718502703",
            available:"20 Copies"
        },

        "Clean Code":{
            publisher:"Prentice Hall",
            year:"2008",
            language:"English",
            pages:"464",
            isbn:"9780132350884",
            available:"8 Copies"
        },

        "Deep Work":{
            publisher:"Grand Central Publishing",
            year:"2016",
            language:"English",
            pages:"304",
            isbn:"9781455586691",
            available:"11 Copies"
        },

        "The Psychology of Money":{
            publisher:"Harriman House",
            year:"2020",
            language:"English",
            pages:"256",
            isbn:"9780857197689",
            available:"18 Copies"
        },

        "Eloquent JavaScript":{
            publisher:"No Starch Press",
            year:"2018",
            language:"English",
            pages:"472",
            isbn:"9781593279509",
            available:"9 Copies"
        },

        "Sapiens":{
            publisher:"Harper",
            year:"2015",
            language:"English",
            pages:"498",
            isbn:"9780062316097",
            available:"13 Copies"
        },

        "Think and Grow Rich":{
            publisher:"The Ralston Society",
            year:"1937",
            language:"English",
            pages:"320",
            isbn:"9781585424337",
            available:"7 Copies"
        },

        "Thinking, Fast and Slow":{
            publisher:"Farrar, Straus and Giroux",
            year:"2011",
            language:"English",
            pages:"512",
            isbn:"9780374533557",
            available:"10 Copies"
        },

        "1984":{
            publisher:"Secker & Warburg",
            year:"1949",
            language:"English",
            pages:"328",
            isbn:"9780451524935",
            available:"6 Copies"
        },

        "JavaScript: The Good Parts":{
            publisher:"O'Reilly Media",
            year:"2008",
            language:"English",
            pages:"176",
            isbn:"9780596517748",
            available:"9 Copies"
        },

        "To Kill a Mockingbird":{
            publisher:"J. B. Lippincott & Co.",
            year:"1960",
            language:"English",
            pages:"336",
            isbn:"9780061120084",
            available:"5 Copies"
        },

        "The 7 Habits of Highly Effective People":{
            publisher:"Free Press",
            year:"1989",
            language:"English",
            pages:"432",
            isbn:"9781982137274",
            available:"11 Copies"
        },

        "The Intelligent Investor":{
            publisher:"Harper Business",
            year:"1949",
            language:"English",
            pages:"640",
            isbn:"9780060555665",
            available:"8 Copies"
        },

        "Getting Things Done":{
            publisher:"Penguin Books",
            year:"2001",
            language:"English",
            pages:"352",
            isbn:"9780143126560",
            available:"12 Copies"
        },

        "Man's Search for Meaning":{
            publisher:"Beacon Press",
            year:"1946",
            language:"English",
            pages:"184",
            isbn:"9780807014295",
            available:"9 Copies"
        },

        "Guns, Germs, and Steel":{
            publisher:"W. W. Norton",
            year:"1997",
            language:"English",
            pages:"528",
            isbn:"9780393354324",
            available:"6 Copies"
        },

        "The Great Gatsby":{
            publisher:"Charles Scribner's Sons",
            year:"1925",
            language:"English",
            pages:"208",
            isbn:"9780743273565",
            available:"14 Copies"
        }

    };

    // ===============================
    // SEARCH & FILTER
    // ===============================

    function filterBooks(){

        const query = searchInput.value.toLowerCase().trim();

        bookCards.forEach(card=>{

            const title=card.dataset.title.toLowerCase();
            const author=card.dataset.author.toLowerCase();
            const category=card.dataset.category.toLowerCase();

            const matchesCategory=currentCategory==="all" || category===currentCategory.toLowerCase();

            const matchesSearch=
            title.includes(query) ||
            author.includes(query) ||
            category.includes(query);

            card.style.display=(matchesCategory && matchesSearch) ? "flex":"none";

        });

    }

    categoryButtons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            categoryButtons.forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            currentCategory=btn.dataset.category;

            filterBooks();

        });

    });

    searchInput.addEventListener("input",filterBooks);

    // ===============================
    // OPEN MODAL
    // ===============================

    bookCards.forEach(card=>{

        card.querySelector(".view-btn").addEventListener("click",()=>{

            modalImg.src=card.dataset.img;

            modalTitle.textContent=card.dataset.title;

            modalAuthor.textContent=card.dataset.author;

            modalCategory.textContent=card.dataset.category;

            modalRating.textContent=card.dataset.rating;

            modalDesc.textContent=card.dataset.desc;

            const info=bookInfo[card.dataset.title];

            if(info){

                modalPublisher.textContent=info.publisher;
                modalYear.textContent=info.year;
                modalLanguage.textContent=info.language;
                modalPages.textContent=info.pages;
                modalISBN.textContent=info.isbn;
                modalAvailable.textContent=info.available;

            }

            modal.style.display="flex";

            currentBook = card.dataset.title;

loadReviews(currentBook);

modal.style.display = "flex";

        });

    });

    // ===============================
    // CLOSE MODAL
    // ===============================

    closeModal.addEventListener("click",()=>{

        modal.style.display="none";

    });

    window.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

});

// ===================================
// LOAD REVIEWS
// ===================================

function loadReviews(book) {

    const reviews = JSON.parse(localStorage.getItem(book)) || [];

    reviewsList.innerHTML = "";

    if (reviews.length === 0) {

        reviewsList.innerHTML = `
            <p style="text-align:center;color:gray;">
                No reviews yet. Be the first to review this book!
            </p>
        `;

        return;
    }

    reviews.reverse().forEach(review => {

        reviewsList.innerHTML += `

        <div class="review-card">

            <h4>${review.name}</h4>

            <div class="review-stars">
                ${"⭐".repeat(review.rating)}
            </div>

            <p>${review.review}</p>

            <small>${review.date}</small>

        </div>

        `;

    });

}


// ===================================
// SUBMIT REVIEW
// ===================================

submitReview.addEventListener("click", () => {

    const name = reviewName.value.trim();
    const rating = Number(reviewRating.value);
    const review = reviewText.value.trim();

    if (name === "" || review === "") {

        alert("Please fill all fields.");

        return;

    }

    const reviews = JSON.parse(localStorage.getItem(currentBook)) || [];

    reviews.push({

        name: name,
        rating: rating,
        review: review,
        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(currentBook, JSON.stringify(reviews));

    reviewName.value = "";
    reviewRating.value = "5";
    reviewText.value = "";

    loadReviews(currentBook);

    alert("✅ Review Submitted Successfully!");

});