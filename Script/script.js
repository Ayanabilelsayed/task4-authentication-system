const btnRegister = document.getElementById("btnRegister");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerForm = document.getElementById("registerForm");


btnRegister.onclick = async (e) => {

    e.preventDefault();

   
    if (
        username.value === "" ||
        email.value === "" ||
        password.value === "" ||
        confirmPassword.value === ""
    ) {
        alert("Please fill in all the fields");
        return;
    }

 
    if (password.value.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }

   
    if (!/\d/.test(password.value)) {
        alert("Password must contain at least one number");
        return;
    }

    // Check password confirmation
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (
        savedUsername === username.value ||
        savedEmail === email.value
    ) {
        alert("Username or email already exists");
        return;
    }

  
    const data = new TextEncoder().encode(password.value);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedPassword = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

  
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", hashedPassword);

    
    window.location.href = "login.html";
};