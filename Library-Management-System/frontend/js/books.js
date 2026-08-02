// ===============================
// BOOKS.JS
// ===============================

const API = "http://localhost:3000/books";

const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");
const searchInput = document.getElementById("search");

// Load books when page opens
window.onload = () => {
    loadBooks();
};

// ===============================
// LOAD BOOKS
// ===============================

async function loadBooks() {
    try {
        const response = await fetch(API);
        const books = await response.json();

        displayBooks(books);

    } catch (error) {
        console.error(error);
    }
}

// ===============================
// DISPLAY BOOKS
// ===============================

function displayBooks(books) {

    bookTable.innerHTML = "";

    books.forEach(book => {

        bookTable.innerHTML += `

        <tr>

            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.quantity}</td>

            <td>${book.available}</td>

            <td>

                <button
                    onclick="deleteBook(${book.id})"
                    style="background:red;color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// ADD BOOK
// ===============================

bookForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;

    const newBook = {
        title,
        author,
        category,
        quantity
    };

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newBook)

        });

        const result = await response.json();

        alert(result.message);

        bookForm.reset();

        loadBooks();

    } catch (error) {

        console.error(error);

    }

});

// ===============================
// DELETE BOOK
// ===============================

async function deleteBook(id) {

    const confirmDelete = confirm("Delete this book?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API}/${id}`, {

            method: "DELETE"

        });

        loadBooks();

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// SEARCH BOOK
// ===============================

searchInput.addEventListener("keyup", async function () {

    const keyword = searchInput.value.toLowerCase();

    const response = await fetch(API);

    const books = await response.json();

    const filtered = books.filter(book =>

        book.title.toLowerCase().includes(keyword) ||

        book.author.toLowerCase().includes(keyword) ||

        book.category.toLowerCase().includes(keyword)

    );

    displayBooks(filtered);

});