const API_URL = "http://localhost:3000/tasks";
const taskList = document.getElementById("taskList");

// Load tasks on page load
window.onload = fetchTasks;

// Fetch all tasks
async function fetchTasks() {
  taskList.innerHTML = "Loading...";
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task));
  } catch {
    taskList.innerHTML = "Failed to fetch tasks.";
  }
}

// Render a task item
function renderTask(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>${task.title}</strong> - ${task.status}</span>
    <button onclick="editTask(${task.id}, '${task.title}', '${task.status}')">Edit</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(li);
}

// Edit task inline
function editTask(id, currentTitle, currentStatus) {
  const li = document.querySelector(`li:has(button[onclick*="${id}"])`);
  li.innerHTML = `
    <input type="text" value="${currentTitle}" id="title-${id}" />
    <select id="status-${id}">
      <option ${currentStatus === "Pending" ? "selected" : ""}>Pending</option>
      <option ${currentStatus === "Completed" ? "selected" : ""}>Completed</option>
    </select>
    <button onclick="updateTask(${id})">Save</button>
    <button onclick="fetchTasks()">Cancel</button>
  `;
}

// Update task using PATCH
async function updateTask(id) {
  const newTitle = document.getElementById(`title-${id}`).value;
  const newStatus = document.getElementById(`status-${id}`).value;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, status: newStatus })
    });
    fetchTasks();
  } catch {
    alert("Error updating task.");
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  } catch {
    alert("Error deleting task.");
  }
}
