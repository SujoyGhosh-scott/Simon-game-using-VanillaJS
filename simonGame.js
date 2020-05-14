let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
    if(strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if(onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if(on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for(let i=0; i < 15; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }

    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;
    //for when the computer's turn is over
    if(flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    //when computer's turn is not over
    if(compTurn) {
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function clearColor() {
    topLeft.style.backgroundColor = "rgb(23, 197, 7)";
    topRight.style.backgroundColor = "rgb(212, 9, 9)";
    bottomLeft.style.backgroundColor = "rgb(228, 231, 19)";
    bottomRight.style.backgroundColor = "rgb(12, 107, 216)";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "rgb(255, 239, 11)";
    bottomRight.style.backgroundColor = "lightskyblue";
}

function one() {
    if(noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if(noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if(noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "rgb(255, 239, 11)";
}

function four() {
    if(noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(3);
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(4);
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if(playerOrder.length == 15 && good) {
        winGame();
    }

    if(good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}