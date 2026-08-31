
const username = document.getElementById("username");
const logoutBtn = document.querySelector(".logout-btn-link");


if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}


username.textContent = localStorage.getItem("username");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
});