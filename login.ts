const form = document.getElementById("login-form") as HTMLFormElement;
const errorEl = document.getElementById("error") as HTMLParagraphElement;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const company = (document.getElementById("company") as HTMLInputElement).value;

  if (!email || !password || !company) {
    errorEl.textContent = "Please fill in all fields.";
    return;
  }

  if (email === "test@example.com" && password === "123456" && company.toLowerCase() === "acme") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "users.html";
  } else {
    errorEl.textContent = "Invalid credentials!";
  }
});
