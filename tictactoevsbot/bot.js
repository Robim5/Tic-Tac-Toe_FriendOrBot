//coisar as variables
const btnX = document.querySelector('#cross')
const btnO = document.querySelector('#circle')
const btnReset = document.querySelector('.reset')
const msg = document.querySelector('#message')
const WhoWon = document.querySelector('#whowon')

const first = document.querySelectorAll('.firstselect')
const Game = document.querySelectorAll('.game')

//dar hidden
Game.forEach(element => {
    element.style.display = 'none';
});

btnReset.style.display = 'none';

//vai dar jeito
var mark;
var boxes;
var activeX = false;
var activeO = false;

//click to get true
btnX.addEventListener('click', () => {
    activeX = true;
    activeO = false;
    setPlayer();
});

btnO.addEventListener('click', () => {
    activeO = true;
    activeX = false;
    setPlayer();
});

//who how é
function setPlayer(){
    if(activeX == true){
        mark = "X";
        msg.textContent = mark + ', click on the square to make your move';
    } else {
        mark = "O";
        msg.textContent = mark + ', click on the square to make your move';
    }

    Game.forEach(element => {
        element.style.display = 'block';
    });

    first.forEach(element => {
        element.style.display = 'none';
    });

    boxes = Array.from(document.querySelectorAll('.box'));
    boxes.forEach(element => {
        element.addEventListener('click', playGame);
    });
}

//to check
function playGame(event) {
    const box = event.target;
    if (box.textContent === '') {
        box.textContent = mark;
        checkWin();
        setTimeout(computerPlay, 500);
    }
}

//bot plays
function computerPlay() {
    const availableBoxes = boxes.filter(box => box.textContent === '');
    const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.textContent = mark === "X"? "O" : "X";
    checkWin();
}

//who won
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (boxes[combination[0]].textContent === boxes[combination[1]].textContent && boxes[combination[1]].textContent === boxes[combination[2]].textContent && boxes[combination[0]].textContent!== '') {
            WhoWon.textContent = `Player ${boxes[combination[0]].textContent} wins!`;
            btnReset.style.display = 'block';
            for (let j = 0; j < 3; j++) {
                boxes[combination[j]].style.background = '#dc2011';
            }
            return;
        }
    }
    if (boxes.every(box => box.textContent!== '')) {
        WhoWon.textContent = 'It\'s a draw!';
        btnReset.style.display = 'block';
    }
}

//clear reset
btnReset.addEventListener('click', () => {
    Game.forEach(element => {
        element.style.display = 'block';
    });
    boxes.forEach(element => {
        element.textContent = '';
        element.style.background = '';
    });
    WhoWon.textContent = '';
    msg.textContent = '';
    activeX = false;
    activeO = false;
    btnReset.style.display = 'none';
});