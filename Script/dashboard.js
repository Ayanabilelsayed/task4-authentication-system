
const username = document.getElementById("username");
const logoutBtn = document.querySelector(".logout-btn-link");

// Get logged-in user
const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(sessionStorage.getItem("loggedInUser"));

// Protect dashboard
if (!loggedInUser) {
    window.location.href = "login.html";
} else {
    // Display username
    username.textContent = loggedInUser.username;
}

// Logout
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove login session
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");

    // Go to login
    window.location.href = "login.html";
});