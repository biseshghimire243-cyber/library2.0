// ================================
// CONTACT PAGE
// ================================

const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.querySelector('input[placeholder="Full Name"]').value;

    const email = document.querySelector('input[placeholder="Email Address"]').value;

    const subject = document.querySelector('input[placeholder="Subject"]').value;

    const message = document.querySelector("textarea").value;

    try {

        const response = await fetch("http://localhost:3000/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                email,

                subject,

                message

            })

        });

        const result = await response.json();

        alert(result.message);

        contactForm.reset();

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

});