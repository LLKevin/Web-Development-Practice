
const GameBoard = (function(){
    let rowColumn = 3;
    let gameboard = [];

    //populate the blank board
    const getGameBoard = () => gameboard;
    populateGameboard();

    function populateGameboard(){
        for(let i =0; i < rowColumn; i++){
            gameboard[i] = [];
            for(let k = 0; k < rowColumn; k++){
                gameboard[i].push(Cell());
            }
        }
    }
    
    const resetGameboard = () =>{
        gameboard = [];
        populateGameboard();
    }

    function Cell(){
        let value = "";
        let status = false;
        let id = crypto.randomUUID();
        const markCell = (player) => {
            value = player;
            // allow the respective play to mark the game board.
            // will check if the move is possible any proceed to make the mark or prompt the user
            // to mark another free cell.
            status = true;
        }
        const getValue = () => value;
        const getId =  () => id;
        const getStatus = () => status;
        const resetValue = () => value = '';
        const resetStatus = () => status = false;
        return {
            markCell,
            getValue,
            getId,
            getStatus,
            resetValue,
            resetStatus,
        };
    }

    return {getGameBoard, resetGameboard};
})();

// used to control the game
const GameController = (function(playerOneName="Player One", playerTwoName="Player Two" ){
    console.log("GAMECONTROLLER")
    const newGameBtn = document.getElementsByClassName('newGame');
    const resetBtn = document.getElementsByClassName('resetGame');
    const board = GameBoard.getGameBoard();
    const players = [{
        name:playerOneName,
        token:1
    },
    {
        name:playerTwoName,
        token:2
    }];
    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1]: players[0];
    }

    resetBtn[0].addEventListener('click', () => {
        for(let i = 0; i < board.length; i++){
            for(let k = 0; k < board.length; k++){
                //Reset the Cells;
                board[i][k].resetValue();
                board[i][k].resetStatus();
                //Redraw the UI;
                UiContoller.reGenerateBoardUI();
                // Reset the turn
                activePlayer = players[0]
            }
        }
    })

    function playRound(){
        let selectCell = {};
        // Will mark the cell() and check if a cell can be marked.
        const boardDivRef = document.getElementsByClassName("board");
        const checkWinConditon = () => {
            console.log("WIN CHECk")
            let diagonalArr = [];
            let reverseDiagonalArr = [];
            // Row
            for(let i=0; i < board.length; i++){
                if(board[i].every(cell => cell.getValue() !== "" 
                && cell.getValue() === board[i][0].getValue())){
                    UiContoller.displayMessage(`${board[i][0].getValue() === 1 ? "X":"O"} is the Winner!`);
                }
            }
            // Diagonal
            for(let i = 0; i < board.length; i++){
                diagonalArr.push(board[i][i].getValue());
                reverseDiagonalArr.push(board[i][board.length - 1 - i].getValue());
            }

            if(diagonalArr.every(item => item === diagonalArr[0]) && 
            diagonalArr[diagonalArr.length - 1] !== ""){
                UiContoller.displayMessage(`${diagonalArr[0] === 1 ? "X":"O"} is the Winner!`);
            }
            if(reverseDiagonalArr.every(item => item === reverseDiagonalArr[0]) 
                && reverseDiagonalArr[diagonalArr.length - 1] !== ""){
                    UiContoller.displayMessage(`${reverseDiagonalArr[0] === 1 ? "X":"O"} is the Winner!`);
            }
    
            // Column
            for(let j=0; j < board.length; j++){
                if(board.every(row => row[j].getValue() !== "" 
                && row[j].getValue() === board[0][j].getValue())){
                    UiContoller.displayMessage(`${board[0][j].getValue() === 1 ? "X":"O"} is the Winner!`);
                }
            }
        };

        // complete the clicking; 
        boardDivRef[0].addEventListener("click", (event) =>{
            for(i=0; i< board.length; i++){
                for(k=0; k<board.length; k++){
                    if(board[i][k].getId() === event.target.getAttribute('data-attribute')){
                        selectCell = board[i][k];
                    }
                }
            }      

            if(selectCell.getStatus() === false){
                selectCell.markCell(activePlayer.token);
                event.target.textContent = activePlayer.token === 1? "X":"O";
                checkWinConditon();
                switchActivePlayer();
            } else {
                // Display Error Message and Ask to select another;
                UiContoller.displayMessage(`${activePlayer.name}, The Cell is already selected. Please select another!`);
            }
        });
        // check win condition
    }
    return {playRound}
})(); 


const UiContoller = (function(){
    const board = GameBoard.getGameBoard();
    // moved to the board section
    
    const messageDiv = document.getElementsByClassName("message");
    const divContainerRef = document.getElementsByClassName('board');
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv";

    const displayMessage = (message) =>{
        messageDiv[0].innerHTML = message;
    };

    const reGenerateBoardUI = () =>{
        buttonDiv.innerHTML = "";
        GenerateBoard();
    }

    function GenerateBoard(){
        for(let i =0; i < board.length; i++){
            for(k=0; k < board.length; k++){
                let button = document.createElement('button');
                //button.value = board[i][k].getValue() === 1 ? "X" : "O";       
                button.setAttribute('data-attribute', board[i][k].getId())         
                button.textContent = board[i][k].getValue();
                buttonDiv.appendChild(button);
            }
        }
        divContainerRef[0].innerHTML = buttonDiv.outerHTML;
    }
    GenerateBoard();
    return {displayMessage, reGenerateBoardUI};
})();


GameController.playRound();