// ========================================
// ISSUE & RETURN
// ========================================

const studentSelect = document.getElementById("student");
const bookSelect = document.getElementById("book");
const issueTable = document.getElementById("issueTable");
const issueForm = document.getElementById("issueForm");
const search = document.getElementById("search");

const STUDENT_API = "http://localhost:3000/students";
const BOOK_API = "http://localhost:3000/books";
const ISSUE_API = "http://localhost:3000/issued";

// ==============================
// Load Page
// ==============================

window.onload = () => {

    loadStudents();

    loadBooks();

    loadIssuedBooks();

};

// ==============================
// Load Students
// ==============================

async function loadStudents() {

    const response = await fetch(STUDENT_API);

    const students = await response.json();

    studentSelect.innerHTML =
        `<option value="">Select Student</option>`;

    students.forEach(student => {

        studentSelect.innerHTML += `

        <option value="${student.id}">

            ${student.name}

        </option>

        `;

    });

}

// ==============================
// Load Books
// ==============================

async function loadBooks() {

    const response = await fetch(BOOK_API);

    const books = await response.json();

    bookSelect.innerHTML =
        `<option value="">Select Book</option>`;

    books.forEach(book => {

        if(book.available > 0){

            bookSelect.innerHTML += `

            <option value="${book.id}">

                ${book.title}

            </option>

            `;

        }

    });

}

// ==============================
// Load Issued Books
// ==============================

async function loadIssuedBooks(){

    const response = await fetch(ISSUE_API);

    const data = await response.json();

    displayIssuedBooks(data);

}

// ==============================
// Display Table
// ==============================

function displayIssuedBooks(data){

    issueTable.innerHTML = "";

    if(data.length===0){

        issueTable.innerHTML=`

        <tr>

            <td colspan="7" class="no-data">

                No Issued Books

            </td>

        </tr>

        `;

        return;

    }

    data.forEach(issue=>{

        issueTable.innerHTML += `

        <tr>

            <td>${issue.id}</td>

            <td>${issue.student}</td>

            <td>${issue.book}</td>

            <td>${issue.issue_date}</td>

            <td>${issue.return_date || "-"}</td>

            <td>

                <span class="status ${issue.status.toLowerCase()}">

                    ${issue.status}

                </span>

            </td>

            <td>

                ${
                    issue.status==="Issued"

                    ?

                    `<button
                        class="return-btn"
                        onclick="returnBook(${issue.id})">

                        Return

                    </button>`

                    :

                    "Returned"

                }

            </td>

        </tr>

        `;

    });

}


// ========================================
// ISSUE BOOK
// ========================================

issueForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student_id = studentSelect.value;
    const book_id = bookSelect.value;
    const issue_date = document.getElementById("issueDate").value;
    const return_date = document.getElementById("returnDate").value;

    if (
        !student_id ||
        !book_id ||
        !issue_date ||
        !return_date
    ) {
        alert("Please fill all fields.");
        return;
    }

    const response = await fetch("http://localhost:3000/issue", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            student_id,
            book_id,
            issue_date,
            return_date
        })

    });

    const result = await response.json();

    alert(result.message);

    issueForm.reset();

    loadBooks();
    loadIssuedBooks();

});

// ========================================
// RETURN BOOK
// ========================================

async function returnBook(id){

    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(

        `http://localhost:3000/return/${id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                return_date:today

            })

        }

    );

    const result = await response.json();

    alert(result.message);

    loadBooks();

    loadIssuedBooks();

}

// ========================================
// SEARCH
// ========================================

search.addEventListener("keyup", async () => {

    const keyword = search.value.toLowerCase();

    const response = await fetch("http://localhost:3000/issued");

    const data = await response.json();

    const filtered = data.filter(item =>

        item.student.toLowerCase().includes(keyword) ||

        item.book.toLowerCase().includes(keyword) ||

        item.status.toLowerCase().includes(keyword)

    );

    displayIssuedBooks(filtered);

});

// ========================================
// AUTO DATE
// ========================================

document.getElementById("issueDate").value =
new Date().toISOString().split("T")[0];

// ========================================
// AUTO REFRESH
// ========================================

setInterval(() => {

    loadIssuedBooks();

},5000);