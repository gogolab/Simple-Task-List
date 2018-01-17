//UI vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");


loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTaskList);
    filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove" ></i>`;

        li.appendChild(link);

        taskList.appendChild(li);
    });
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function addTask(e) {
    e.preventDefault();

    if(taskInput.value === "") {
        alert("Add a task");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove" ></i>`;

        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
    }
}

function removeTask(e) {
    if(e.target.parentNode.classList.contains("delete-item")) {
        if(confirm("Are you sure?")) {
            e.target.parentNode.parentNode.remove();

            removeTaskFromLocalStorage(e.target.parentNode.parentNode)
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function clearTaskList() {
    while(taskList.firstChild) {
        taskList.firstChild.remove();
    }

    cleatTasksFromLocalStorage();
}

function cleatTasksFromLocalStorage() {
    localStorage.removeItem("tasks");
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task) {

        const item = task.firstChild.textContent.toLowerCase();

        if(item.indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}