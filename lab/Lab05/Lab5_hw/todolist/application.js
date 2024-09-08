const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTask();
    } else {
        alert("Please enter a task.");
    }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteTask btn btn-danger btn-sm";
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
        taskList.removeChild(listItem);
        saveTask();
    });

    taskList.appendChild(listItem);
}

function saveTask() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(function (item) {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
}