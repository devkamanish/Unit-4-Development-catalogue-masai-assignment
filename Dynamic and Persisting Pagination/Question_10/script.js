const userList = document.getElementById("user-list");
const errorDiv = document.getElementById("error");

const USERS_PER_PAGE = 6;

async function loadPage(pageNumber) {
  userList.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageNumber}&_limit=${USERS_PER_PAGE}`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const users = await response.json();

    if (users.length === 0) {
      userList.innerHTML = "<p>No users found for this page.</p>";
      return;
    }

    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.textContent = `${user.name} (${user.email}) - ${user.username}`;
      userList.appendChild(userDiv);
    });
  } catch (error) {
    console.error(error);
    errorDiv.textContent = "Something went wrong while loading users.";
  }
}

// Load initial page
loadPage(1);
