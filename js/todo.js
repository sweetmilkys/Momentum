const toDoForm = document.querySelector(".js-to-do"),
    toDoInput = document.querySelector(".js-add-to-do"),
    toDoList = document.querySelector(".js-list");

let toDos = [];

function handleSubmit(event) {
    event.preventDefault();
    const inputValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(inputValue);
    return;
}

function saveToDo(text){
    const toDoObject = {
        id: toDos.length + 1,
        value: text
    };
    toDos.push(toDoObject);
    persistToDos();
    return;
}

function persistToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
    return;
}

function handleDelete(event) {
    const target = event.target,
        li = target.parentElement
        ul = li.parentElement,
        toDoId = li.id;
    ul.removeChild(li);
    toDos = toDos.filter(toDo => {
        return toDo.id !== parseInt(toDoId);
    });
    persistToDos();
    return;
}

function paintToDo(text) {
    const toDo = document.createElement("li"),
        deleteBtn = document.createElement("span"),
        toDoLabel = document.createElement("label");
    toDo.attributes({class: "toDo", id: toDos.length + 1});
    deleteBtn.className = "toDo_button";
    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", handleDelete);
    todoLabel.innerHTML = text;
    toDoList.appendChild(toDo.appendChild(toDoLabel.appendChild(deleteBtn)));
    saveToDo(text);
    return;
}

function loadToDos(){
    const loadedToDos = localStorage.getItem("toDos");
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.value);
        });
    }
    return;
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();