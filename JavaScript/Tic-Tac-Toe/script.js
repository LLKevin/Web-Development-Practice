
const GameBoard = (function(){
    let rowColumn = 3;
    let gameboard = [];
    //populate the blank board
    const getGameBoard = () => gameboard;
    for(let i =0; i < rowColumn; i++){
        gameboard[i] = [];
        for(let k = 0; k < rowColumn; k++){
            gameboard[i].push(Cell());
        }
    }


   // console.log(gameboard)
    function Cell(){
        let value = "";
        const markCell = (player) => {
            value = player;
            // allow the respective play to mark the game board.
            // will check if the move is possible any proceed to make the mark or prompt the user
            // to mark another free cell.
        }
        const getValue = () => value;
        return {
            markCell,
            getValue
        };
    }

    return {getGameBoard};
})();

// used to control the game
function GameController(playerOneName="Player One", playerTwoName="Player Two" ){
    const board = GameBoard.getGameBoard();
    console.log(board);
    const activePlayer = players[0];
    const players = [{
        name:playerOneName,
        token:1
    },
    {
        name:playerTwoName,
        token:2
    }];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1]: players[0];
    }
    const getActivePlayer = () => activePlayer;

    const playARound = (column) => {
        // Will mark the cell() and check if a cell can be marked.
        // check win condition
    }
} 

function UiController(){
    const board = GameBoard.getGameBoard();
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv";
    const divContainerRef = document.getElementsByClassName('board');
    const generateButton = () => document.createElement('button');
    function GenerateBoard(){
        for(let i =0; i < board.length; i++){
            for(k=0; k<board.length; k++){
                let button = generateButton();
                button.value = board[i][k].getValue() === 1 ? "X" : "O";                
                button.textContent = board[i][k].getValue();
                buttonDiv.appendChild(button);
            }
        }
        divContainerRef[0].innerHTML = buttonDiv.outerHTML;
    }

   const displayBoard = () => new GenerateBoard();

   displayBoard();
}

UiController();