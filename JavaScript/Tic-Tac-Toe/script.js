const GameBoard = (function(){
    let gameboard = [];
    //populate the blank board
    const getGameBoard = () => gameBoard;
    
    function Cell(){
        let value = 0;
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
})();

function gameController(playerOneName="Player One", playerTwoName="Player Two" ){
    const board = GameBoard();
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

    const playARound = (column) => {}
} 