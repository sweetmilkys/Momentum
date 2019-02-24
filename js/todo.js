const toDoForm = document.querySelector(".js-to-do"),
    toDoInput = document.querySelector(".js-add-to-do"),
    toDoList = document.querySelector(".js-list");

let toDos = [];

const handleSubmit = event => {
    event.preventDefault();
    const inputValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(inputValue);
    return;
}

const saveToDo = text => {
    const toDoObject = {
        id: toDos.length + 1,
        value: text
    };
    toDos.push(toDoObject);
    persistToDos();
    return;
}

const persistToDos = () => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
    return;
}

const handleDelete = event => {
    const target = event.target,
        li = target.parentElement,
        ul = li.parentElement,
        toDoId = ul.id;
    ul.removeChild(li);
    toDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(toDoId);
    });
    persistToDos();
    return;
}

const paintToDo = text => {
    const toDo = document.createElement("li"),
        deleteBtn = document.createElement("span"),
        toDoLabel = document.createElement("label");
    toDo.className = "toDo";
    toDo.id = toDos.length + 1;
    deleteBtn.className = "toDo_button";
    deleteBtn.innerHTML = " ❌";
    deleteBtn.addEventListener("click", handleDelete);
    toDoLabel.innerHTML = text;
    toDoLabel.appendChild(deleteBtn);
    toDo.appendChild(toDoLabel);
    toDoList.appendChild(toDo);
    saveToDo(text);
    return;
}

const loadToDos = () => {
    const loadedToDos = localStorage.getItem("toDos");
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.value);
        });
    }
    return;
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();