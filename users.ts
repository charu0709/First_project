let currentPage = 1;
const limit = 10; // number of users per scroll

const userList = document.getElementById("user-list")!;
const loading = document.getElementById("loading")!;
const logoutBtn = document.getElementById("logout-btn")!;

if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});

async function fetchUsers() {
  if (loading.style.display === "block") return;

  loading.style.display = "block";

  const response = await fetch(`https://randomuser.me/api/?page=${currentPage}&results=${limit}&seed=abc`);
  const json = await response.json();

  json.results.forEach((user: any) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${user.name.first} ${user.name.last}</strong> (${user.email})<br>
      <img src="${user.picture.thumbnail}" width="50" style="border-radius: 50%; margin-top: 5px;"><br><br>
    `;
    div.style.borderBottom = "1px solid #ccc";
    div.style.padding = "10px 0";
    userList.appendChild(div);
  });

  loading.style.display = "none";
  currentPage++;
}



window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    fetchUsers();
  }
});

fetchUsers();
