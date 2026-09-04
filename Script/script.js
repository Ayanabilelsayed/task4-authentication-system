const btnRegister = document.getElementById("btnRegister");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerForm = document.getElementById("registerForm");

btnRegister.onclick = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
        username.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value === "" ||
        confirmPassword.value === ""
    ) {
        alert("Please fill in all the fields");
        return;
    }

    // Check password length
    if (password.value.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }

    // Check number
    if (!/\d/.test(password.value)) {
        alert("Password must contain at least one number");
        return;
    }

    // Check password confirmation
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username or email already exists
    const userExists = users.some(
        (user) =>
            user.username.toLowerCase() === username.value.trim().toLowerCase() ||
            user.email.toLowerCase() === email.value.trim().toLowerCase()
    );

    if (userExists) {
        alert("Username or email already exists");
        return;
    }

    // Hash password
    const data = new TextEncoder().encode(password.value);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedPassword = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

    // Create new user
    const newUser = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: hashedPassword
    };

    // Add new user to array
    users.push(newUser);

    // Save users array
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    // Go to login page
    window.location.href = "login.html";
};
