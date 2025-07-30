const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");
const message = document.getElementById("message");

const API_BASE = "https://mockapi.io/users"; // ❌ Will cause CORS error

// 🔁 Fetch and display users
async function fetchUsers() {
  userList.innerHTML = "Loading...";
  try {
    const res = await fetch(API_BASE); // Replace with proxy if needed
    const users = await res.json();

    userList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email})`;
      userList.appendChild(li);
    });
  } catch (err) {
    userList.innerHTML = "Failed to fetch users.";
  }
}

// ➕ Add new user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    message.textContent = "All fields required.";
    message.style.color = "red";
    return;
  }

  const newUser = { name, email };

  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (!res.ok) throw new Error("Failed to add user");

    message.textContent = "User added successfully!";
    message.style.color = "green";
    userForm.reset();
    fetchUsers(); // Update list dynamically
  } catch (err) {
    message.textContent = "Error adding user.";
    message.style.color = "red";
  }
});

// Initialize user list
fetchUsers();
