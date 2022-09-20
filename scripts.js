const Player = (marker) => {

    function getMarker() {
        return marker;
    };

    return {getMarker}
};

const gameBoard = (() => {
    // Constants
    const board = Array(9).fill(null);
    const tiles = [...document.getElementById("board").children];

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
    };

    function checkWins() {
        const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let flag = false;

        for (let i = 0; i < patterns.length; i++) {
            let [a,b,c] = [patterns[i][0], patterns[i][1], patterns[i][2]];
            if (board[a] && board[b] && board[c]) {
                flag = true;
            };
        };
        return flag;
    };

    function updateBoard(tile) {
        if (board[tile]) {
            console.log("something already here");
        } else {
            board[tile] = gameController.whosTurn();
            render();
            return checkWins();
        }
    };

    return {reset};

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

    return {whosTurn}
})();

