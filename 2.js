const X_CLASS = 'X'
const CIRCLE_CLASS = 'O'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const statusDisplay = document.querySelector('.game-status')
const restartButton = document.querySelector('.game-restart')
const cellElements = document.querySelectorAll('.cell')
cellElements.forEach(el => {
    el.removeEventListener('click', clickedEvent)
    el.addEventListener('click', clickedEvent, { once: true })
})
restartButton.addEventListener('click', restartGame)

let xTurn = true; //oTurn === false
let gameActive = true;
let gameArr = ["", "", "", "", "", "", "", "", ""]



function clickedEvent(){
    if(gameActive){
        let clickedIndex = Number(this.getAttribute('data-cell-index'))
        gameArr[clickedIndex] = xTurn
        this.innerHTML = currentPlayerTurn()

        checkDraw()
        checkWin()
        swapTurn()
        
        console.log(gameArr)
    }
}


function checkWin(){
    roundWon = false;
    for(let i = 0; i < 8; i++){
        let el = WINNING_COMBINATIONS[i]
        let a = gameArr[el[0]]
        let b = gameArr[el[1]]
        let c = gameArr[el[2]]
        if (a === '' || b === '' || c === '') {
            continue
        }
        if (a === b && b === c) {
            roundWon = true
            gameActive = false
            break
        }
    }

    if(roundWon){
        statusDisplay.innerHTML = "Победа " + currentPlayerTurn() + "'ов !!!"
    }
}


function checkDraw(){
    let roundDraw = !gameArr.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = "Ничья!"
        gameActive = false
        return
    }
}


function restartGame() {
    xTurn = true
    gameActive = true
    gameArr = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = "Ход " + currentPlayerTurn() + "'ов"
    cellElements.forEach(el => {
        el.removeEventListener('click', clickedEvent)
        el.addEventListener('click', clickedEvent, { once: true })
        el.innerHTML = ""
    })
}

function currentPlayerTurn(){
    if(xTurn){
        return X_CLASS
    }else{
        return CIRCLE_CLASS
    }
}

function swapTurn(){
    if(gameActive){
        xTurn = !xTurn
        statusDisplay.innerHTML = "Ход " + currentPlayerTurn() + "'ов"
        return xTurn
    }
}