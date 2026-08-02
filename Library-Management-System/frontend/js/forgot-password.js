// =====================================
// FORGOT PASSWORD
// =====================================

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resetBtn = document.getElementById("resetBtn");

const emailSection = document.getElementById("emailSection");
const otpSection = document.getElementById("otpSection");
const passwordSection = document.getElementById("passwordSection");

const message = document.getElementById("message");

// ===============================
// SEND OTP
// ===============================

sendOtpBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();

    if(email === ""){

        message.style.color = "red";
        message.innerHTML = "Please enter your email.";
        return;

    }

    try{

        const response = await fetch("http://localhost:3000/forgot-password",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email
            })

        });

        const result = await response.json();

        if(result.success){

            message.style.color = "green";
            message.innerHTML = result.message;

            emailSection.style.display = "none";
            otpSection.style.display = "block";

        }

        else{

            message.style.color = "red";
            message.innerHTML = result.message;

        }

    }

    catch(error){

        console.log(error);

        message.style.color = "red";
        message.innerHTML = "Server Connection Failed.";

    }

});

// ===============================
// VERIFY OTP
// ===============================

verifyOtpBtn.addEventListener("click", async()=>{

    const email = document.getElementById("email").value.trim();

    const otp = document.getElementById("otp").value.trim();

    if(otp===""){

        message.style.color="red";
        message.innerHTML="Please enter OTP.";
        return;

    }

    try{

        const response = await fetch("http://localhost:3000/verify-otp",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                otp

            })

        });

        const result = await response.json();

        if(result.success){

            message.style.color="green";
            message.innerHTML=result.message;

            otpSection.style.display="none";
            passwordSection.style.display="block";

        }

        else{

            message.style.color="red";
            message.innerHTML=result.message;

        }

    }

    catch(error){

        console.log(error);

        message.style.color="red";
        message.innerHTML="Server Connection Failed.";

    }

});

// ===============================
// RESET PASSWORD
// ===============================

resetBtn.addEventListener("click", async()=>{

    const email = document.getElementById("email").value.trim();

    const newPassword = document.getElementById("newPassword").value.trim();

    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(newPassword==="" || confirmPassword===""){

        message.style.color="red";
        message.innerHTML="Please fill all password fields.";

        return;

    }

    if(newPassword!==confirmPassword){

        message.style.color="red";
        message.innerHTML="Passwords do not match.";

        return;

    }

    try{

        const response = await fetch("http://localhost:3000/reset-password",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                newPassword

            })

        });

        const result = await response.json();

        if(result.success){

            message.style.color="green";
            message.innerHTML=result.message;

            setTimeout(()=>{

                window.location.href="login.html";

            },2000);

        }

        else{

            message.style.color="red";
            message.innerHTML=result.message;

        }

    }

    catch(error){

        console.log(error);

        message.style.color="red";
        message.innerHTML="Server Connection Failed.";

    }

});