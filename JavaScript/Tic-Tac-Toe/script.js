
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
        return {
            markCell,
            getValue,
            getId,
            getStatus,
        };
    }

    return {getGameBoard};
})();

// used to control the game
const GameController = (function(playerOneName="Player One", playerTwoName="Player Two" ){
    console.log("GAMECONTROLLER")
    
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
    const getActivePlayer = () => activePlayer;

    const checkWinCondition = () =>{};

    function playRound(){
        let selectCell = {};
        // Will mark the cell() and check if a cell can be marked.
        const boardDivRef = document.getElementsByClassName("board");


        // complete the clicking; 
        boardDivRef[0].addEventListener("click", (event) =>{
            for(i=0; i< board.length; i++){
                for(k=0; k<board.length; k++){
                    if(board[i][k].getId() === event.target.getAttribute('data-attribute')){
                        selectCell = board[i][k];
                    }
                }
            }      

            console.log(selectCell.getStatus())
            if(selectCell.getStatus() === false){
                selectCell.markCell(activePlayer.token);
                event.target.textContent = activePlayer.token === 1? "X":"O";
                switchActivePlayer();
            } else {
                // Display Error Message and Ask to select another;
                UiContoller.displayMessage(`${activePlayer.name}, The Cell is already selected. Please select another!`);
            }
            
        });
        // check win condition
        
    }
    // when a new game button is added.
    const newGame = () =>{}

    return {playRound}
})(); 


const UiContoller = (function(){
    const board = GameBoard.getGameBoard();
    // moved to the board section
    
    const messageDiv = document.getElementsByClassName("message");
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv";

    
    const divContainerRef = document.getElementsByClassName('board');
    const displayMessage = (message) =>{
        console.log(message);
        messageDiv[0].innerHTML = message;
    };

    function GenerateBoard(){
        for(let i =0; i < board.length; i++){
            for(k=0; k<board.length; k++){
                let button = document.createElement('button');
                button.value = board[i][k].getValue() === 1 ? "X" : "O";       
                button.setAttribute('data-attribute', board[i][k].getId())         
                button.textContent = board[i][k].getValue();
                buttonDiv.appendChild(button);
            }
        }
        divContainerRef[0].innerHTML = buttonDiv.outerHTML;
    }

   const displayBoard = () => new GenerateBoard();
   displayBoard();
   return {displayMessage};
})();


GameController.playRound();