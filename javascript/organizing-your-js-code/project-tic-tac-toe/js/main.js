'use strict';

const ticTacToe = (function() {
    /**
     * Factory function to create a Player object
     * @param {String} _name Name of the Player
     * @param {Number} _symbol Character code of symbol that represents the Player 
     * @returns 
     */
    const playerFactory = function(_name, _symbol, _key) {
        const getName = () => _name;
        const setName = function(newName) {
            _name = newName;
        };

        const getSymbol = () => _symbol;
        const setSymbol = function(newSymbol) {
            _symbol = newSymbol;
        };

        const getKey = () => _key;

        const handleNameChange = function(e) {

        };

        const handleSymbolChange = function(e) {

        };

        return {
            getName, setName,
            getSymbol, setSymbol,
            getKey,
        };
    };

    const gameSquareFactory = function(_squareElement) {
        let _playerSelect = null;
        
        const getPlayerSelect = () => _playerSelect;
        const setPlayerSelect = function(newPlayerSelect) {
            _playerSelect = newPlayerSelect;
            
            // Update HTML element
            if (!_playerSelect) {
                _squareElement.dataset.key = 0;
                _squareElement.querySelector('span').textContent = '';
            } else {
                _squareElement.dataset.key = _playerSelect.getKey();
                _squareElement.querySelector('span').textContent = _playerSelect.getSymbol();
            }
        };

        const getBoardIndex = () => +_squareElement.dataset.index;

        const reset = function() {
            setPlayerSelect(null);
        };

        return {
            squareElement: _squareElement, 
            getPlayerSelect, setPlayerSelect,
            getBoardIndex,
            reset,
        };
    };

    const gameBoard = (function() {
        const WINNING_INDEX_PATTERNS = [
            [0,1,2], // top row
            [3,4,5], // middle row
            [6,7,8], // bottom row
            [0,3,6], // left column
            [1,4,7], // middle column
            [2,5,8], // right column
            [0,4,8], // back slash
            [2,4,6], // forward slash
        ];

        const _squares = [];

        /**
         * 
         * @param {Number} index 
         * @returns {Square|undefined} Returns Square with matching index if found, else returns undefined.
         */
        const getSquareByIndex = function(index) {
            return _squares.find(square => square.getBoardIndex() === index);
        };

        /**
         * @returns {Object|null} Object with Player winner and the three Squares that make the line. Return null if NO winner. 
         */
        const checkForWinner = function() {
            let square, playerToCompare;
            for (let i = 0; i < WINNING_INDEX_PATTERNS.length; i++) {
                // First square in win pattern
                square = getSquareByIndex(WINNING_INDEX_PATTERNS[i][0]);
                // Continue if square NOT found OR NO Player has selected square yet.
                if (!square || !square.getPlayerSelect()) continue;
                // Set Player of first square to compare with other squares
                playerToCompare = square.getPlayerSelect();

                // Second square in win pattern
                square = getSquareByIndex(WINNING_INDEX_PATTERNS[i][1]);
                if (!square || !square.getPlayerSelect()) continue;
                // Continue if Player in this square is different than first square
                if (square.getPlayerSelect() !== playerToCompare) continue;

                // Third square in win pattern
                square = getSquareByIndex(WINNING_INDEX_PATTERNS[i][2]);
                if (!square || !square.getPlayerSelect()) continue;
                // Continue if Player in this square is different than first square
                if (square.getPlayerSelect() !== playerToCompare) continue;

                // If reach this point, win pattern has same Player in all three squares
                console.log(`Win Condition Satisfied: ${WINNING_INDEX_PATTERNS[i]}\nWinning Player: ${playerToCompare.getName()}`);
                return;
            }

            // If reach this point, no winner found.
            // Check if any more empty squares. If none, game is tied.
            if (_squares.every(square => square.getPlayerSelect() !== null)) {
                console.log(`Tied Condition Satisfied: No more squares!`);
            }
        };

        const reset = function() {
            _squares.forEach(square => square.reset());
        };

        const init = function(boardElement, handleSquareSelect) {
            boardElement.querySelectorAll('.board-square').forEach(squareElement => {
                const square = gameSquareFactory(squareElement);

                squareElement.addEventListener('click', e => {
                    handleSquareSelect(e, square);
                }, false);

                _squares.push(square);
            });
        };

        return {
            init,
            checkForWinner,
            reset,
        };
    })();
    
    const game = (function() {
        const _playerOne = playerFactory('Player 1', 'X', 1);
        const _playerTwo = playerFactory('Player 2', 'O', 2);
        let bIsPlayerOneTurn = true;

        const handleSquareSelect = function(e, boardSquare) {
            // Return if square has already been selected by Player
            if (boardSquare.getPlayerSelect() !== null) return;

            // Set squares player select property to reference current turn Player
            boardSquare.setPlayerSelect(bIsPlayerOneTurn ? _playerOne : _playerTwo);

            // Change turns to other Player
            bIsPlayerOneTurn = !bIsPlayerOneTurn;

            gameBoard.checkForWinner();
        };

        const init = function(boardElement, playerInfoElement) {
            gameBoard.init(boardElement, handleSquareSelect);
        };

        const reset = function() {
            bIsPlayerOneTurn = true;
            gameBoard.reset();
        };

        const displayPlayerInfo = function() {
            console.log(`Player One: ${_playerOne.getName()} - '${_playerOne.getSymbol()}'`);
            console.log(`Player Two: ${_playerTwo.getName()} - '${_playerTwo.getSymbol()}'`);
        };
        return {
            init,
            displayPlayerInfo,
        };
    })();

    return {
        game,
        gameBoard,
    };
})();

ticTacToe.game.init(
    document.getElementById('tic-tac-toe-board'), 
    document.getElementById('player-info')
);