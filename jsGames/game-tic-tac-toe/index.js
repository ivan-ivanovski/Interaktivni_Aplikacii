let board;
let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;
let gameOver = false;
let t = [];

window.onload = () => {
	setGame();
}
function setGame() {
	board = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	]

	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			let tile = document.createElement('div');
			tile.setAttribute("class", "tile");
			tile.id = r.toString() + '-' + c.toString();
			tile.addEventListener('click', setTile);
			document.querySelector("#board").append(tile);
		}
	}
}
function setTile() {
	if (gameOver) {
		return;
	}
	let tileCoords = this.id.split("-");
	let tileCoord0 = parseInt(tileCoords[0]);
	let tileCoord1 = parseInt(tileCoords[1]);
	// console.log(tileCoords);
	// console.log(tileCoord0 + " " + tileCoord1);
	if (board[tileCoord0][tileCoord1] != ' ') return;

	board[tileCoord0][tileCoord1] = currentPlayer;

	this.innerText = currentPlayer;

	if (currentPlayer == player1) { currentPlayer = player2; }
	else { currentPlayer = player1 }

	checkWinner();
}

function checkWinner() {
	let tile;
	//horizontal
	for (let r = 0; r < 3; r++) {
		if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {

			for (let index = 0; index < 3; index++) {
				tile = document.getElementById(r.toString() + '-' + index.toString());
				tile.style.background = 'lightsalmon';
			}
			t.push(tile);

			showWinner()
		}
	}
	//vertical
	for (let c = 0; c < 3; c++) {
		if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {

			for (let index = 0; index < 3; index++) {
				tile = document.getElementById(index.toString() + '-' + c.toString());
				tile.style.background = "lightsalmon";
			}
			t.push(tile);
			showWinner()

		}
	}
	//diagonally
	if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {

		for (let index = 0; index < 3; index++) {
			tile = document.getElementById(index.toString() + '-' + index.toString());
			tile.style.background = "lightsalmon";
		}
		t.push(tile);
		showWinner()
	}

	if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
		let tile = document.getElementById('0-2');
		tile.style.background = "lightsalmon";
		tile = document.getElementById('1-1');
		tile.style.background = "lightsalmon";
		tile = document.getElementById('2-0');
		tile.style.background = "lightsalmon";
		t.push(tile);
		showWinner()
	}
}
function showWinner() {
	let tileCompereText = t[0].innerHTML;
	let winText = document.createElement('h2');

	let winner = document.querySelector("#winner");
	winner.classList.remove('hidden')
	let winTextContent;
	let btnPlayAgain = "<button onclick='playAgain(this)'>Play Again</button>";
	if (tileCompereText === 'X') {
		winTextContent = document.createTextNode("The winner is Player 1.");
		winText.append(winTextContent);
		winner.innerHTML = winText.outerHTML + btnPlayAgain;
	}
	else if (tileCompereText === "O") {
		winTextContent = document.createTextNode("The winner is Player 2.");
		winText.append(winTextContent);
		winner.innerHTML = winText.outerHTML
	}

	gameOver = true;
	return;
}
function playAgain(e) {
	return window.location.reload();
}