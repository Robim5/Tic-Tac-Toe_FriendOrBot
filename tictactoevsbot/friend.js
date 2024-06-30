let playerText = document.getElementById('playertext')
let restartBtn = document.getElementById('restartbtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerindicator = getComputedStyle(document.body).getPropertyValue('--darkgreen')
//console.log(boxes);

const O_Let = "O"
const X_Let = "X"
let currentPlayer = X_Let
let spaces = Array(9).fill(null)

//console.log(spaces)

const startGame = () => {
    boxes.forEach((box, index) => box.addEventListener('click', () => boxClicked(index)))
}

function boxClicked(id) {
    if (!spaces[id]) {
        spaces[id] = currentPlayer
        boxes[id].innerText = currentPlayer

        if(playerHasWon()!== null){
            playerText.innerText = `${currentPlayer} has won!`
            let winningblocks = playerHasWon()

            winningblocks.forEach(box => boxes[box].style.backgroundColor = winnerindicator) 
            return
        }

        currentPlayer = currentPlayer == X_Let? O_Let : X_Let
    }
}

restartBtn.addEventListener("click", restart)

function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerText = "Tic Tac Toe"

    currentPlayer = X_Let
    //playerText.innerText = "Player X's turn"
}

const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return condition // return the winning combination
        }
    }
    return null
}

startGame()