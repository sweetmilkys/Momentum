const clockContainer = document.querySelector(".js-clock .clock_text");

function getTime(){
    const date = new Date(),
        hours = date.getHours(),    
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    clockContainer.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
    return;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    return;
}

init();