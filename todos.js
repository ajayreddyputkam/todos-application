let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveButtonTodoEl = document.getElementById("saveButtonTodo");



function getTodoListLocalStorage() {
    let stringifiedTodo = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodo);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListLocalStorage();
let todoCount = todoList.length;


saveButtonTodoEl.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function toDoChecked(uniqueCheckBoxId, uniqueLabelId, uniqueToDoElId) {
    let uniCheckEl = document.getElementById(uniqueCheckBoxId);
    let unilabelEl = document.getElementById(uniqueLabelId);
    if (uniCheckEl.checked === true) {
        unilabelEl.classList.add("checked");
    } else {
        unilabelEl.classList.remove("checked");
    }

    let indexOfTodo = todoList.findIndex(function(eachToDo) {
        let eachToDoId = "toDo" + eachToDo.uniqueId;
        if (eachToDoId === uniqueToDoElId) {
            return true;
        } else {
            return false;
        }
    });
    let toDOtoStrikeEl = todoList[indexOfTodo];
    if (toDOtoStrikeEl.isChecked === true) {
        toDOtoStrikeEl.isChecked = false;
    } else {
        toDOtoStrikeEl.isChecked = true;
    }
}

function deleteToDoFun(uniqueToDoElId) {
    let uniToDoEl = document.getElementById(uniqueToDoElId);
    todoItemsContainer.removeChild(uniToDoEl);
    let indexOfTaskTODelete = todoList.findIndex(function(eachItem) {
        let eachItemId = "toDo" + eachItem.uniqueId;
        if (eachItemId === uniqueToDoElId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(indexOfTaskTODelete, 1);
}


function createAndAppendTodo(todo) {
    let uniqueCheckBoxId = "checkbox" + todo.uniqueId;
    let uniqueLabelId = "label" + todo.uniqueId;
    let uniqueToDoElId = "toDo" + todo.uniqueId;

    let todoItemListElement = document.createElement("li");
    todoItemListElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemListElement.id = uniqueToDoElId;
    todoItemsContainer.appendChild(todoItemListElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = uniqueCheckBoxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        toDoChecked(uniqueCheckBoxId, uniqueLabelId, uniqueToDoElId);
    };

    todoItemListElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoItemListElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", uniqueCheckBoxId);
    labelElement.textContent = todo.text;
    labelElement.id = uniqueLabelId;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIconElement.onclick = function() {
        deleteToDoFun(uniqueToDoElId);
    };

    deleteIconContainer.appendChild(deleteIconElement);

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function addTodoTasksFun() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let usertoDo = {
        text: userInputValue,
        uniqueId: todoCount,
        isChecked: false
    };
    todoList.push(usertoDo);
    createAndAppendTodo(usertoDo);
    userInputElement.value = "";
}

let addingTodoElement = document.getElementById("addToDoTasks");
addingTodoElement.onclick = function() {
    addTodoTasksFun();
}