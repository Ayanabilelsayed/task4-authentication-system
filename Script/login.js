
const btnLogin = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");


btnLogin.addEventListener("click", async (e) => {

    e.preventDefault();

  
    if (
        email.value === "" ||
        password.value === "" ||
        rememberMe.checked === false
    ) {
        alert("Please fill in all the fields");
        return;
    }

    
    const data = new TextEncoder().encode(password.value);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedPassword = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

 
    if (
        savedEmail === email.value &&
        savedPassword === hashedPassword &&
        rememberMe.checked === true
    ) {

      
        localStorage.setItem("loggedInUser", email.value);

       
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid email or password");
    }
});
