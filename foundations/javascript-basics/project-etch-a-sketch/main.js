'use strict';

/**
 * 
 * @param {Element} etchASketchElement
 * @param {Function} handleOnMouseOver 
 */
function EtchASketch(etchASketchElement, handleOnMouseOver) {
    this.etchASketchElement = etchASketchElement;
    this.handleOnMouseOver = handleOnMouseOver;
}

/** Initializes an instance of EtchASketch. */
EtchASketch.prototype.init = function() {
    // Create 'Clear' button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', function() {
        this.handleClearBoard();
    }.bind(this), false);
    this.etchASketchElement.appendChild(clearBtn);

    // Create and set board container node to hold created square grid
    this.boardContainerNode = document.createElement('div');
    this.boardContainerNode.classList.add('square-board-container');
    this.etchASketchElement.appendChild(this.boardContainerNode);

    // Create sqaure grid with default number of squares on each side
    this.createSquareGrid();
};

/**
 * Creates a square grid with equal number of smaller squares along each side.
 * @param {Number} numPerSide
 */
EtchASketch.prototype.createSquareGrid = function(numPerSide = 16) {
    const boardNode = document.createElement('div');
    boardNode.classList.add('board');

    let rowNode, dataNode;
    for (let i = 0; i < numPerSide; i++) {
        rowNode = document.createElement('div');
        rowNode.classList.add('board-row');
        for (let j = 0; j < numPerSide; j++) {
            dataNode = document.createElement('div');
            dataNode.classList.add('board-square');
            dataNode.dataset.row = i;
            dataNode.dataset.col = j;
            dataNode.addEventListener('mouseover', this.handleOnMouseOver, false);

            rowNode.appendChild(dataNode);
        }
        boardNode.appendChild(rowNode);
    }
    this.boardContainerNode.appendChild(boardNode);
};

/** Handles clicking the Clear button. */
EtchASketch.prototype.handleClearBoard = function() {
    // Get valid number of sides from user prompt
    let numSides;
    do {
        numSides = +prompt('Enter number of sides (1-100): ');
    } while (!Number.isInteger(numSides) || numSides < 1 || numSides > 100);

    // Remove all elements from container
    while (this.boardContainerNode.firstChild) 
        this.boardContainerNode.removeChild(this.boardContainerNode.firstChild);

    // Add new grid with prompted number of sides
    this.createSquareGrid(numSides);
};

(function() {
    // Add black-white etch-a-sketch
    const etchASketchBlackNWhite = new EtchASketch(
        document.getElementById('black-n-white-etch-a-sketch'),
        e => {
            e.target.style.backgroundColor = 'black';
        }
    );

    // Add random color etch-a-sketch
    const etchASketchRandomColor = new EtchASketch(
        document.getElementById('rand-color-etch-a-sketch'),
        e => {
            e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 25%)`;
        }
    );

    // Add fade-to-black etch-a-sketch
    // Add black-white etch-a-sketch
    const etchASketchFadeToBlack = new EtchASketch(
        document.getElementById('fade-to-black-etch-a-sketch'),
        e => {
            // Add 10% black to background-color
            if (!e.target.dataset.hasOwnProperty('lightPercent')) {
                e.target.dataset.lightPercent = 90;
            } else {
                const prevLightPercent = +e.target.dataset.lightPercent;
                //  Return if already at 0%
                if (prevLightPercent <= 0) return;
                e.target.dataset.lightPercent = prevLightPercent - 10;
            }

            e.target.style.backgroundColor = `hsl(0, 0%, ${e.target.dataset.lightPercent}%)`;
        }
    );
    
    etchASketchBlackNWhite.init();
    etchASketchRandomColor.init();
    etchASketchFadeToBlack.init();
})();