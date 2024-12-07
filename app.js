// Get tasks from localStorage
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Save tasks to localStorage
function saveToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add task to localStorage
function addTaskToLocalStorage(id, value, isOptional = false) {
    const newTodo = {
        id: id,
        value: value,
        createdAt: new Date().toLocaleString(), // Current date and time
        isOptional: isOptional,
    };
    const todos = getFromLocalStorage();
    todos.push(newTodo);
    saveToLocalStorage(todos);
    displayTodos();
}

// Delete a task
function deleteTask(id) {
    let todos = getFromLocalStorage();
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage(todos);
    displayTodos();
}

// Display tasks
function displayTodos() {
    const todos = getFromLocalStorage();
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    todos.forEach(todo => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        // Display task with creation date and optional danger signal
        taskElement.innerHTML = `
            <div>
                <span>${todo.value} ${todo.isOptional ? '<span class="danger-icon">🚨</span>' : ''}</span>
                <small>Created at: ${todo.createdAt}</small>
            </div>
            <div>
                <button onclick="deleteTask(${todo.id})">Delete</button>
            </div>
        `;

        // Highlight if optional
        if (todo.isOptional) {
            taskElement.style.color = "red";
            taskElement.style.fontWeight = "bold";
        }

        taskContainer.appendChild(taskElement);
    });
}

// Form submission logic
document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const isOptional = document.getElementById("is-optional").checked;

    addTaskToLocalStorage(Date.now(), taskName, isOptional);

    document.getElementById("todo-form").reset();
});

// Initial display of tasks
displayTodos();