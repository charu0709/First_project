"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentPage = 1;
let totalPages = Infinity;
const limit = 6;
const userList = document.getElementById("user-list");
const loading = document.getElementById("loading");
const logoutBtn = document.getElementById("logout-btn");
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentPage > totalPages)
            return;
        loading.style.display = "block";
        const response = yield fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=${limit}`);
        const json = yield response.json();
        totalPages = json.total_pages;
        json.data.forEach((user) => {
            const div = document.createElement("div");
            div.innerHTML = `
      <strong>${user.first_name} ${user.last_name}</strong> (${user.email})<br>
      <img src="${user.avatar}" width="50" style="border-radius: 50%; margin-top: 5px;"><br><br>
    `;
            div.style.borderBottom = "1px solid #ccc";
            div.style.padding = "10px 0";
            userList.appendChild(div);
        });
        loading.style.display = "none";
        currentPage++;
    });
}
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        fetchUsers();
    }
});
fetchUsers();
