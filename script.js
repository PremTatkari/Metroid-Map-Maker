let x = 0;
let y = 0;
let edit = 0;
let currentCoords = "x" + x + "y" + y
let selectedClass = ".x" + x + "y" + y;
const grid = document.querySelector(".grid");
const info = document.querySelector("textarea");
const coords = document.querySelector(".coords");

const getItem = (item) => JSON.parse(localStorage.getItem(item));
const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

for (let i = 0; i < 50; i++)
    for (let j = 0; j < 60; j++) {
        const obj = getItem("x" + j + "y" + i) ? getItem("x" + j + "y" + i) : { colour: "dimgray", description: "" };
        setItem("x" + j + "y" + i, obj);
    }

for (let i = 0; i < 50; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 60; j++) {
        const box = document.createElement("td");
        box.className = "x" + j + "y" + i;
        box.id = "x" + j + "y" + i;
        box.style.backgroundColor = getItem("x" + j + "y" + i).colour;
        box.setAttribute("onmousedown", "handleClick(this.getAttribute('id'))");
        row.appendChild(box);
    }
    grid.appendChild(row);
}

let selected = document.querySelector(selectedClass);
selected.classList.add("selected");
info.value = getItem(currentCoords).description;
coords.textContent = "x: " + x + " " + "y: " + y;

const handleClick = (c) => {
    selected.classList.remove("selected");
    const co = c.split("y");
    x = co[0].slice(1);
    y = co[1];
    currentCoords = "x" + x + "y" + y
    selectedClass = "." + currentCoords;
    info.value = getItem(currentCoords).description;
    coords.textContent = "x: " + x + " " + "y: " + y;
    selected = document.querySelector(selectedClass);
    selected.classList.add("selected");
    info.style.height = 'auto';
    info.style.height = info.scrollHeight + 'px';
}

const colours = {
    B: "blue",
    G: "green",
    R: "dimgray",
    Y: "yellow"
}

document.addEventListener("keydown", (event) => {
    const k = event.key;
    if (!event.shiftKey && k == "Enter" && edit == 0) {
        event.preventDefault();
        info.removeAttribute("disabled");
        info.focus();
        edit = 1;
    }
    else if (!event.shiftKey && k == "Enter" && edit == 1) {
        const prev = getItem(currentCoords);
        setItem(currentCoords, { colour: prev.colour, description: info.value });
        info.setAttribute("disabled", "disabled");
        edit = 0;
    }

    if (edit == 0) {
        if (k == "ArrowLeft" || !event.shiftKey && (k == "a" || k == "A")) {
            selected.classList.remove("selected");
            x = x > 0 ? x - 1 : 59;
        }
        else if (k == "ArrowRight" || !event.shiftKey && (k == "d" || k == "D")) {
            selected.classList.remove("selected");
            x = x < 59 ? x + 1 : 0;
        }
        else if (k == "ArrowUp" || !event.shiftKey && (k == "w" || k == "W")) {
            selected.classList.remove("selected");
            y = y > 0 ? y - 1 : 49;
        }
        else if (k == "ArrowDown" || !event.shiftKey && (k == "s" || k == "S")) {
            selected.classList.remove("selected");
            y = y < 49 ? y + 1 : 0;
        }
        else if (colours.hasOwnProperty(k)) {
            console.log(k + " " + colours[k]);
            const prev = getItem(currentCoords);
            setItem(currentCoords, { colour: colours[k], description: prev.description });
            selected.style.backgroundColor = colours[k];
        }
        else if (k == "~") {
            localStorage.clear();
            location.reload();
        }

        currentCoords = "x" + x + "y" + y
        selectedClass = "." + currentCoords;
        info.value = getItem(currentCoords).description;
        coords.textContent = "x: " + x + " " + "y: " + y;
        selected = document.querySelector(selectedClass);
        selected.classList.add("selected");
    }
    info.style.height = 'auto';
    info.style.height = info.scrollHeight + 'px';
});
info.style.height = 'auto';
info.style.height = info.scrollHeight + 'px';

const decodeAnimation = () => {
    const textElement = document.querySelector(".info h1");
    textElement.classList.remove("alien-font");
    const originalText = textElement.textContent;
    const alienChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?[];,./`~';
    const decodingSpeed = 60; // ms per frame, slower speed for longer duration
    const stepsPerCharacter = 3; // more steps for a longer duration

    // Initialize the text with spans for each character
    textElement.innerHTML = Array.from(originalText).map(char => `<span class="alien-font">${getRandomChar()}</span>`).join('');
    const spans = textElement.querySelectorAll('span');
    let step = 0;

    function getRandomChar() {
        return alienChars[Math.floor(Math.random() * alienChars.length)];
    }

    function decodeStep() {
        let isDecodingComplete = true;

        for (let i = 0; i < originalText.length; i++) {
            if (step >= i * stepsPerCharacter && spans[i].textContent !== originalText[i]) {
                spans[i].textContent = originalText[i];
                spans[i].classList.remove('alien-font');
            } else if (step < i * stepsPerCharacter) {
                spans[i].textContent = getRandomChar();
                isDecodingComplete = false;
            }
        }

        if (!isDecodingComplete) {
            step++;
            setTimeout(decodeStep, decodingSpeed);
        }
    }

    decodeStep();
}

    setTimeout(decodeAnimation, 800);





