document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Render tasks on page load
    renderTasks();
  
    // Add Task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Task cannot be empty!");
        return;
      }
  
      const task = {
        id: Date.now(),
        text: taskText,
      };
  
      tasks.push(task);
      saveToLocalStorage();
      renderTasks();
      taskInput.value = "";
    });
  
    // Render tasks function
    function renderTasks() {
      taskList.innerHTML = "";
  
      tasks.forEach((task) => {
        const li = document.createElement("li");
  
        li.innerHTML = `
          <span>${task.text}</span>
          <div class="task-actions">
            <button class="edit-btn" data-id="${task.id}">Edit</button>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
          </div>
        `;
  
        taskList.appendChild(li);
      });
    }
  
    // Handle edit and delete clicks
    taskList.addEventListener("click", (e) => {
      const target = e.target;
      const taskId = target.getAttribute("data-id");
  
      if (target.classList.contains("delete-btn")) {
        deleteTask(taskId);
      } else if (target.classList.contains("edit-btn")) {
        editTask(taskId);
      }
    });
  
    // Edit Task
    function editTask(id) {
      const task = tasks.find((task) => task.id === Number(id));
  
      if (task) {
        const newText = prompt("Edit your task:", task.text);
        if (newText !== null && newText.trim() !== "") {
          task.text = newText.trim();
          saveToLocalStorage();
          renderTasks();
        }
      }
    }
  
    // Delete Task
    function deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== Number(id));
      saveToLocalStorage();
      renderTasks();
    }
  
    // Save tasks to local storage
    function saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  