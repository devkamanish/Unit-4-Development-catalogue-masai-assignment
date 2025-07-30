const form = document.getElementById("registrationForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    messageDiv.textContent = "Please fill in all fields.";
    messageDiv.style.color = "red";
    return;
  }

  const userData = { name, email, password };

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    messageDiv.textContent = "Registration successful!";
    messageDiv.style.color = "green";
    form.reset();
  } catch (error) {
    messageDiv.textContent = `Error: ${error.message}`;
    messageDiv.style.color = "red";
  }
});
