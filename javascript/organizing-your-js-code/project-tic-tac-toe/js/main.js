'use strict';

const ticTacToe = (function(boardElement, playerInfoElement) {
    /**
     * Factory function to create a Player object
     * @param {String} _name Name of the Player
     * @param {Number} _symbol Character code of symbol that represents the Player 
     * @returns 
     */
    const _playerFactory = function(_name, _symbol) {
        const getName = () => _name;
        const setName = function(newName) {
            _name = newName;
        };

        const getSymbol = () => _symbol;
        const setSymbol = function(newSymbol) {
            _symbol = newSymbol;
        };

        return {
            getName,
            setName,
            getSymbol,
            setSymbol,
        };
    };
    
    const game = (function() {
        const _playerOne = _playerFactory('Player 1', 'X');
        const _playerTwo = _playerFactory('Player 2', 'O');

        const _gameBoard = (function(boardElement) {

        })(boardElement);

        const displayPlayerInfo = function() {
            console.log(`Player One: ${_playerOne.getName()} - '${_playerOne.getSymbol()}'`);
            console.log(`Player Two: ${_playerTwo.getName()} - '${_playerTwo.getSymbol()}'`);
        };
        return {
            displayPlayerInfo,
        };
    })();

    return {
        game,
    };
})(document.getElementById('tic-tac-toe-board'), document.getElementById('player-info'));