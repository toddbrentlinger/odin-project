'use strict';

const ticTacToe = (function() {
    /**
     * Factory function to create a Player object
     * @param {String} _name Name of the Player
     * @param {Number} _symbol Character code of symbol that represents the Player 
     * @param {String} _color String representation of color to be used in CSS styling
     * @param {Number} _key Number reprsenting player (ex. 1 is Player 1, 2 is Player 2). Compare with HTML element data attribute.
     * @param {String} editElementId ID for element containing form for user to change Player properties
     * @param {String} infoElementId ID for element displaying information about Player
     * @returns {Object} player
     */
    const playerFactory = function(_name, _symbol, _color, _key, editElementId, infoElementId) {
        const _editElement = document.getElementById(editElementId);
        const _infoElement = document.getElementById(infoElementId);

        const getName = () => _name;
        const setName = function(newName) {
            _name = newName;
            _infoElement.querySelector('.player-name').textContent = _name;
        };

        const getSymbol = () => _symbol;
        const setSymbol = function(newSymbol) {
            _symbol = newSymbol;
            _infoElement.querySelector('.player-symbol').textContent = _symbol;
            gameBoard.refresh();
        };

        const getColor = () => _color;
        const setColor = function(newColor) {
            _color = newColor;
            document.querySelector(':root').style.setProperty(`--player-${_key === 1 ? 'one' : 'two'}-color`, _color);
        };

        const getKey = () => _key;

        const updateEditForm = function() {

        };

        const handleEditFormSubmit = function(e) {
            // Prevent default behavior of submitting form
            e.preventDefault();

            // Name
            if (e.target.elements.name.value) {
                setName(e.target.elements.name.value);
            }
            // Symbol
            if (e.target.elements.symbol.value) {
                setSymbol(e.target.elements.symbol.value);
            }
            // Color
            if (e.target.elements.color.value !== getColor()) {
                setColor(e.target.elements.color.value);
            }

            // Add hide class to edit element to remove from the window
            _editElement.classList.add('hide');
        };

        const handleEditFormClose = function() {
            // Add hide class to edit element to remove from the window
            _editElement.classList.add('hide');
        };

        const init = function () {
            // Add event listener to edit form submit
            _editElement.querySelector('form').addEventListener('submit', handleEditFormSubmit, false);

            // Add event listener to close edit form
            _editElement.querySelector('.close-player-edit-btn').addEventListener('click', handleEditFormClose, false);
            // Also clicking outside of modal will close the edit form
            _editElement.addEventListener('click', handleEditFormClose, false);
            // Fix issue when clicking inside modal will also close the edit form
            _editElement.firstElementChild.addEventListener('click', e => e.stopPropagation(), false);

            // Update edit form to show existing Player values
            updateEditForm();

            // Add event listener to info element edit button to show Player edit form
            _infoElement.querySelector('.edit-player-btn').addEventListener('click', () => {
                // Remove 'hide' class from edit element to add to the window 
                _editElement.classList.remove('hide');
            }, false);
        };
        init();

        return {
            getName, setName,
            getSymbol, setSymbol,
            getColor, setColor,
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

        const refresh = function() {
            if (!_playerSelect) {
                _squareElement.querySelector('span').textContent = '';
            } else {
                _squareElement.querySelector('span').textContent = _playerSelect.getSymbol();
            }
        };

        return {
            squareElement: _squareElement, 
            getPlayerSelect, setPlayerSelect,
            getBoardIndex,
            reset,
            refresh,
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
         * @returns {Object|Number} gameResult Object with Player winner and the three Squares that make the line. Return 0 if game is still being played OR -1 for tie game.
         * @returns {Player|null} gameResult.player Winning Player or null if no winner for tied games or games still being played.
         * @returns {Square[]|null} gameResult.squares Array of Squares
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
                return {
                    player: playerToCompare,
                    squares: WINNING_INDEX_PATTERNS[i].map(squareIndex => getSquareByIndex(squareIndex)),
                };
            }

            // If reach this point, no winner found.
            // Check if any more empty squares. If none, game is tied.
            if (_squares.every(square => square.getPlayerSelect() !== null)) {
                return -1;
            }

            // If reach this point, no win or tie game
            return 0;
        };

        /** Updates gameboard to reflect any changes in Player properties (symbol or color) */
        const refresh = function() {
            _squares.forEach(square => square.refresh());
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
            refresh,
        };
    })();
    
    const game = (function() {
        const _playerOne = playerFactory('Player 1', 'X', '#5271ff', 1, 'player-one-edit','player-one-info');
        const _playerTwo = playerFactory('Player 2', 'O', '#ff5271', 2, 'player-two-edit', 'player-two-info');
        let bIsPlayerOneTurn = true;
        let bIsGameOver = false;

        const handleSquareSelect = function(e, boardSquare) {
            // Return if game is already over
            if (bIsGameOver) return;

            // Return if square has already been selected by Player
            if (boardSquare.getPlayerSelect() !== null) return;

            // Set squares player select property to reference current turn Player
            boardSquare.setPlayerSelect(bIsPlayerOneTurn ? _playerOne : _playerTwo);

            // Change turns to other Player
            bIsPlayerOneTurn = !bIsPlayerOneTurn;

            const gameResults = gameBoard.checkForWinner();

            // If game has winner
            if (gameResults.hasOwnProperty('player')) {
                bIsGameOver = true;
                console.log(`Win Condition Squares: ${gameResults.squares.map(square => square.getBoardIndex())}\nWinning Player: ${gameResults.player.getName()}`);
            }
            // Else if game has tied
            else if (gameResults === -1) {
                bIsGameOver = true;
                console.log(`Tied Condition Satisfied: No more squares!`);
            }
            // Else game continues
        };

        const init = function(boardElement, playerInfoElement) {
            gameBoard.init(boardElement, handleSquareSelect);
        };

        const reset = function() {
            bIsPlayerOneTurn = true;
            bIsGameOver = false;
            gameBoard.reset();
        };

        const displayPlayerInfo = function() {
            console.log(`Player One: ${_playerOne.getName()} - '${_playerOne.getSymbol()}' - ${_playerOne.getColor()}`);
            console.log(`Player Two: ${_playerTwo.getName()} - '${_playerTwo.getSymbol()}' - ${_playerTwo.getColor()}`);
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