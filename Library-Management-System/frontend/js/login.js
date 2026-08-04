// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

   const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("message");

    message.style.color = "red";
    message.textContent = "";

    try {

        const response = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

           body: JSON.stringify({
    email,
    password
})

        });

        const result = await response.json();

        if(result.success){

            message.style.color = "green";

            message.textContent = result.message;

            // Save login status
            localStorage.setItem("loggedIn", "true");

            // Redirect after 1 second
            setTimeout(() => {

                window.location.href = "index.html";

            },1000);

        }

        else{

            message.textContent = result.message;

        }

    }

    catch(error){

        console.error(error);

        message.textContent = "Server connection failed.";

    }

});