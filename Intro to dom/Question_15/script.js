document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => {
        span.style.textDecoration = "line-through";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.append(span, completeBtn, deleteBtn);
    document.getElementById("taskList").appendChild(li);

    taskInput.value = ""; // Clear input
});


