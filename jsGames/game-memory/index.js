let cardList = [
    "spade-5",
    "club-2",
    "heart-3",
    "diamond-3",
    "heart-2",
    "club-3",
    "diamond-4",
    "spade-2",
    "spade-3",
    "heart-4",
    "diamond-5",
    "club-5",
    "heart-5",
    "spade-4",
    "club-4",
    "diamond-2",
]

let cardSet;
let board = [];

let rows = 4;
let cols = 8;

window.onload = function () {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    console.log(cardSet);
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    for (let i = 0; i < cardList.length; i++) {
        let randomCardPosition = Math.floor(Math.random() * cardList.length)
        let temp = cardSet[i];
        cardSet[i] = cardSet[randomCardPosition];
        cardSet[randomCardPosition] = temp;
    }
    console.log(cardSet);
}

let timerSec = 120;

function startGame() {
    let timer = document.getElementById("timer");
    timer.innerHTML = timerSec + " sec ";
    for (let row = 0; row < rows; row++) {
        let cardRow = [];
        for (let col = 0; col < cols; col++) {
            let cardImage = cardSet.pop();
            cardRow.push(cardImage);

            let card = document.createElement("img");
            card.id = row.toString() + "-" + col.toString();
            card.src = "./images/" + cardImage + ".png";
            card.classList.add('card-image');
            card.addEventListener("click", selectCard)
            document.getElementById("card-game-board").append(card);
        }
        board.push(cardRow);
    }
    setTimeout(hide, 5000);
}

let timeLeft;

function hide() {

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let card = document.getElementById(row.toString() + "-" + col.toString());
            card.src = "./images/card-back.png";
        }
    }

    timeLeft = setInterval(function () {
        if (timerSec <= 0) {
            clearInterval(timeLeft);
            document.getElementById("timer").innerHTML = "Your time is up.";
        } else {
            document.getElementById("timer").innerHTML = timerSec + " sec";
            timerSec--;
        }
    }, 1000);
}



let card1Selected;

let card2Selected;

function selectCard() {
    console.log(this);
    if (this.src.includes("/images/card-back")) {

        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            console.log(coords);
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            console.log(r + " " + c);
            card1Selected.src = './images/' + board[r][c] + ".png";
        }
        else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            console.log(coords);
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            console.log(r + " " + c);
            card2Selected.src = './images/' + board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }
}

let errors = 0;

let playerScore = 0;

function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "./images/card-back.png";
        card2Selected.src = "./images/card-back.png";
        errors += 1;
        document.querySelector("#playerErrors").innerHTML = errors;
        if (errors >= 20) {
            alert("Game Over. You need to work on you memory. Try Again");
            window.location.reload();
        }
    }
    else {
        if (playerScore >= 1500 && errors <= 20) {
            alert("Well Done. You have nice memory");
            window.location.reload();
            return;
        }
        playerScore += 100;
        document.querySelector("#playerScore").innerHTML = playerScore;

    }
    card1Selected = null;
    card2Selected = null;
}