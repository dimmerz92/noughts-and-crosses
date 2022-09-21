const Player = (marker) => {
    let wins = 0;

    function getMarker() {
        return marker;
    };

    function winGame() {
        wins++;
    };

    function getWins() {
        return wins;
    };

    return {getMarker, winGame, getWins}
};

const gameBoard = (() => {
    // Attributes
    const board = Array(9).fill(null);
    const tiles = [...document.getElementById("board").children];
    let gameStatus = true;

    // Listeners
    tiles.forEach(tile => {tile.addEventListener("click", tile => updateBoard(Number(tile.target.id) - 1))});
    
    // Methods
    function render() {
        for (let i = 0; i < board.length; i++) {
            tiles[i].textContent = board[i];          
        }
    };

    function reset() {
        board.fill(null);
        render();
        gameStatus = true;
    };

    function stopGame() {
        gameStatus = false;
    };

    function checkWins(marker) {
        const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

        for (let i = 0; i < patterns.length; i++) {
            let [a,b,c] = [patterns[i][0], patterns[i][1], patterns[i][2]];
            if (board[a] === marker && board[b] === marker && board[c] === marker) {
                return "win";
            } else if (board.length === 9 && !board.includes(null)) {
                return "draw";
            };
        };
    };

    function updateBoard(tile) {
        if (!gameStatus) {
            return;
        };

        let marker = gameController.whosTurn();

        if (board[tile]) {
            console.log("something already here");
        } else {
            board[tile] = marker;
            render();
        }

        if (checkWins(marker) === "win") {
            gameController.endGame(marker);
        } else if (checkWins(marker) === "draw") {
            gameController.endGame();
        };
    };

    return {reset, stopGame};

})();

const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let turn = 0;

    function whosTurn() {
        if (turn % 2 == 0) {
            turn++;
            return player1.getMarker();
        } else {
            turn++;
            return player2.getMarker();
        };
    };

    function endGame(marker = null) {
        // TODO
        if (player1.getMarker() === marker) {
            player1.winGame();
            gameBoard.stopGame();
        } else if (player2.getMarker() === marker) {
            player2.winGame();
            gameBoard.stopGame();
        } else {
            console.log(marker);
        };
    };

    return {whosTurn, endGame, player1, player2}
})();
