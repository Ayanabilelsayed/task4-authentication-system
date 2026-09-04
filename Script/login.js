
const btnLogin = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
        email.value.trim() === "" ||
        password.value === ""
    ) {
        alert("Please fill in all the fields");
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Hash entered password
    const data = new TextEncoder().encode(password.value);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashedPassword = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    // Find user
    const user = users.find(
        (user) =>
            user.email.toLowerCase() === email.value.trim().toLowerCase() &&
            user.password === hashedPassword
    );

    // Check login
    if (!user) {
        alert("Invalid email or password");
        return;
    }

    // Save logged-in user
    const loggedInUser = {
        username: user.username,
        email: user.email
    };

    if (rememberMe.checked) {
        // Keep user logged in
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );
    } else {
        // Keep login only for current browser tab/session
        sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );
    }

    // Go to dashboard
    window.location.href = "dashboard.html";
});
