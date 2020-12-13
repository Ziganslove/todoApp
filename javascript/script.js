function onPageLoaded() {
    const addButton = document.querySelector("button.btnAdd");
    const saveButton = document.querySelector("button.btnSave");
    const deleteButton = document.querySelector("button.btnDelete");
    const closeTipsButton = document.querySelector("a.closeTips");
    const overlay = document.querySelector("#overlay");
    const input = document.querySelector("input[type='text']");
    const ol = document.querySelector("ol.todos");

    function createToDo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        if (newTodo != '') { // Создание нового элемента todo, если поле ввода не пустое
            textSpan.append(newTodo);

            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("todo-delete");
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-times");
            deleteBtn.appendChild(icon);

            ol.appendChild(li).append(textSpan, deleteBtn);
            input.value = "";
            listenDeleteToDo(deleteBtn);
        }
    }

    function editToDo(event) {
        const text = event.target.innerHTML;
        const input = document.createElement('input');
        input.type = "text";
        input.value = text;
        input.className = 'edit';
        input.maxLength = 33;
        event.target.innerHTML = '';
        const edit = event.target.appendChild(input);
        edit.addEventListener('keypress', (keyPressed) => {
            const keyEnter = 13;
            if (keyPressed.which == keyEnter) {
                event.target.innerHTML = input.value;
            }
        })
    }

    function onClickToDo(event) { // Пометить todo-элемент отмеченным при клике на пустое поле рядом с текстом todo-элемента
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        } else if (event.target.tagName === "SPAN") { // Редактировать todo-элемент при клике на текст todo-элемента
            editToDo(event);
        }
    }

    function listenDeleteToDo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ol.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-delete");
        for (const button of deleteButtons) {
            listenDeleteToDo(button);
        }
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createToDo();
        }
    });

    ol.addEventListener("click", onClickToDo);

    addButton.addEventListener('click', () => {
        createToDo();
    })
    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ol.innerHTML);
    });
    deleteButton.addEventListener("click", () => {
        ol.innerHTML = "";
        localStorage.removeItem('todos', ol.innerHTML);
    });

    loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);