"use strict";
const form = document.getElementById("login-form");
const errorEl = document.getElementById("error");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const company = document.getElementById("company").value;
    if (!email || !password || !company) {
        errorEl.textContent = "Please fill in all fields.";
        return;
    }
    if (email === "test@example.com" && password === "123456" && company.toLowerCase() === "acme") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "users.html";
    }
    else {
        errorEl.textContent = "Invalid credentials!";
    }
});
