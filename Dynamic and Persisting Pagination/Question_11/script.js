const userList = document.getElementById("user-list");
const sortSelect = document.getElementById("sort");
const errorDiv = document.getElementById("error");

async function fetchAndDisplayUsers(sortBy = "name") {
  try {
    errorDiv.textContent = ""; // Clear previous error
    userList.innerHTML = ""; // Clear previous data

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();

    // Sort users by selected field
    users.sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    });

    // Display users
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.username}) - ${user.email}`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    errorDiv.textContent = "Something went wrong while fetching user data.";
  }
}

// Initial load
fetchAndDisplayUsers();

// Event listener for sorting
sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;
  fetchAndDisplayUsers(selectedValue);
});
