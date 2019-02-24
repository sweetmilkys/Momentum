const nameContainer = document.querySelector(".js-name");

const paintName = text => {
    nameContainer.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name_text";
    title.innerHTML = `Hello ${text}`;
    nameContainer.appendChild(title);
    return;
}

const onSubmit = event => {
    event.preventDefault();
    const submitTarget = event.target,
        submitInput = submitTarget.querySelector("input"),
        submitValue = submitInput.value;
    localStorage.setItem("userName", submitValue);
    paintName(submitValue);
    return; 
}

const paintInput = () => {
    const nameInput = document.createElement("input"),
        nameForm = document.createElement("form");
    nameInput.className = "name_input"
    nameInput.type = "text"
    nameInput.placeholder = "Please enter your name here";
    nameForm.addEventListener("submit", onSubmit);
    nameForm.appendChild(nameInput);
    nameContainer.appendChild(nameForm);
    return;
}

const loadName = () => {
    const name = localStorage.getItem("userName");
    if(name === null){
        paintInput();
    } else {
        paintName(name);
    }
    return;
}

function init(){
    loadName();
}

init();