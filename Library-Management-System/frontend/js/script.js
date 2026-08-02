// ===============================
// Library Management System
// script.js
// ===============================

// Load dashboard data
async function loadDashboard() {
    try {
        const response = await fetch("http://localhost:3000/dashboard");
        const data = await response.json();

        document.getElementById("books").textContent = data.totalBooks;
        document.getElementById("students").textContent = data.totalStudents;
        document.getElementById("issued").textContent = data.totalIssued;

    } catch (error) {
        console.error("Error loading dashboard:", error);

        document.getElementById("books").textContent = "0";
        document.getElementById("students").textContent = "0";
        document.getElementById("issued").textContent = "0";
    }
}

// Run when page loads
window.onload = () => {
    loadDashboard();
};