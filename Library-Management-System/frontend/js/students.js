// ======================================
// STUDENT MANAGEMENT
// students.js
// ======================================

const API = "http://localhost:3000/students";

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("search");

// Load students when page opens
window.onload = () => {
    loadStudents();
};

// ===========================
// LOAD STUDENTS
// ===========================

async function loadStudents() {

    try {

        const response = await fetch(API);

        const students = await response.json();

        displayStudents(students);

    } catch (error) {

        console.error(error);

    }

}

// ===========================
// DISPLAY STUDENTS
// ===========================

function displayStudents(students) {

    studentTable.innerHTML = "";

    if (students.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:20px;">
                    No Students Found
                </td>
            </tr>
        `;

        return;

    }

    students.forEach(student => {

        studentTable.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.address || ""}</td>

            <td>${student.course || ""}</td>

            <td>${student.semester || ""}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===========================
// ADD STUDENT
// ===========================

studentForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        course: document.getElementById("course").value,

        semester: document.getElementById("semester").value

    };

    try{

        const response = await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

        const result = await response.json();

        alert(result.message);

        studentForm.reset();

        loadStudents();

    }

    catch(error){

        console.log(error);

    }

});

// ===========================
// DELETE STUDENT
// ===========================

async function deleteStudent(id){

    const confirmDelete = confirm("Delete this student?");

    if(!confirmDelete) return;

    try{

        await fetch(`${API}/${id}`,{

            method:"DELETE"

        });

        loadStudents();

    }

    catch(error){

        console.log(error);

    }

}

// ===========================
// SEARCH STUDENTS
// ===========================

searchInput.addEventListener("keyup",async function(){

    const keyword = searchInput.value.toLowerCase();

    const response = await fetch(API);

    const students = await response.json();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||

        student.email.toLowerCase().includes(keyword) ||

        student.phone.toLowerCase().includes(keyword) ||

        (student.course || "").toLowerCase().includes(keyword)

    );

    displayStudents(filtered);

});