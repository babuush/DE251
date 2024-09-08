const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task)
        taskInput.value = '';
        saveTask()
    } else {
        alert("Enter a task");
    }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    taskList.appendChild(listItem);
}

function saveTask() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(function (item) {
        tasks.push(item.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}