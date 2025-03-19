
const btns = document.querySelectorAll('.mode-btn'); 
const body = document.querySelector("body");
const input_todo = document.getElementById('todo-input');

btns.forEach(function(btn) {
    btn.addEventListener("click", function(event) { 
        if (event.target.id === "DARK") {
            body.style.background = "#101114";
            body.style.color = "white";
            input_todo.style.color = "white";
        }
        if (event.target.id === "LIGHT") {
            body.style.background = "white";
            body.style.color = "black";
            input_todo.style.color = "black";
        }
    });
});

// Code for TODO app
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodo = getTodo();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodo.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodo.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;

    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input id="${todoId}" type="checkbox">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${todoText}</label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const deleteBtn = todoLI.querySelector(".delete-button");
    deleteBtn.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodo[todoIndex].completed = checkbox.checked;
        saveTodo();
    });

    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex) {
    allTodo = allTodo.filter((_, i) => i !== todoIndex);
    saveTodo();
    updateTodoList();
}

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(allTodo));
}

function getTodo() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
