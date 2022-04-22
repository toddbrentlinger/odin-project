'use strict';

/**
 * 
 * @param {Element} etchASketchContainerElement
 * @param {Number} numPerSide 
 */
function EtchASketch(etchASketchContainerElement, numPerSide = 16) {
    this.containerElement = etchASketchContainerElement;
    this.numPerSide = numPerSide;
    this.selectedFGColor = '#000000';
    this.selectedBGColor = '#FFFFFF';
    this.bInteractOnMouseOver = true;
    this.handleOnMouseOver = this.addSelectedFGColor;
    this.handleOnMouseDown = null;
}

/** Initializes an instance of EtchASketch. */
EtchASketch.prototype.init = function() {
    this.inputContainerElement = this.containerElement.querySelector('.etch-a-sketch-input');
    this.etchASketchElement = this.containerElement.querySelector('.etch-a-sketch');
    if (!this.etchASketchElement) {
        // TODO: Create element with class 'etch-a-sket' and append as child to container element
        // Just in case the element doesn't exist
    }
    // Create and set board container node to hold created square grid
    this.boardContainerNode = document.createElement('div');
    this.boardContainerNode.classList.add('square-board-container');
    this.etchASketchElement.appendChild(this.boardContainerNode);

    // Create sqaure grid with default number of squares on each side
    this.createSquareGrid();

    // Add button event listeners
    let element;

    // FG Color Picker
    element = this.inputContainerElement.querySelector('[data-key="fg-color-picker"]');
    if (element) {
        element.value = this.selectedFGColor;
        element.addEventListener('input', function(e) {
            this.selectedFGColor = e.target.value;
            this.setActiveFunction(this.addSelectedFGColor);
        }.bind(this), false);
    }

    // BG Color Picker
    element = this.inputContainerElement.querySelector('[data-key="bg-color-picker"]');
    if (element) {
        element.value = this.selectedBGColor;
        element.addEventListener('input', function(e) {
            this.selectedBGColor = e.target.value;
        }.bind(this), false);
    }
    
    // Random Color
    this.setupInputButton('random-color', 'click', this.randomColor);
    
    // Erase Color
    this.setupInputButton('erase-color', 'click', this.erase);
    
    // Darken Shade
    this.setupInputButton('darken', 'click', function(e) {
        this.shade(e.target, true);
    }.bind(this));
    
    // Lighten Shade
    this.setupInputButton('lighten', 'click', function(e) {
        this.shade(e.target, false);
    }.bind(this));
    
    // Clear
    this.setupInputButton('clear', 'click', this.handleClearBoard);
    element = this.inputContainerElement.querySelector('[data-key="clear"]');
    if (element) {
        element.addEventListener('click', function() {
            this.handleClearBoard();
        }.bind(this), false);
    }

    // Mouse Over
    this.setupInputButton('mouse-over', 'click', function() {
        // If mouse-over is already set, return
        if (this.bInteractOnMouseOver) return;
        this.bInteractOnMouseOver = true;
        this.handleOnMouseOver = this.handleOnMouseDown;
        this.handleOnMouseDown = null;

    }.bind(this));

    // Mouse Down
    this.setupInputButton('mouse-down', 'click', function() {
        // If mouse-down is already set, return
        if (!this.bInteractOnMouseOver) return;
        this.bInteractOnMouseOver = false;
        this.handleOnMouseDown = this.handleOnMouseOver;
        this.handleOnMouseOver = null;
    }.bind(this));
};

/**
 * 
 * @param {String} dataKey 
 * @param {String} type
 * @param {Function} listener 
 */
EtchASketch.prototype.setupInputButton = function(dataKey, type, listener) {
    const element = this.inputContainerElement.querySelector(`[data-key="${dataKey}"]`);
    if (element) {
        element.addEventListener(type, function() {
            this.setActiveFunction(listener);
        }.bind(this));
    }
};

/**
 * 
 * @param {Function} func 
 */
EtchASketch.prototype.setActiveFunction = function(func) {
    if (this.bInteractOnMouseOver) {
        this.handleOnMouseOver = func;
        this.handleOnMouseDown = null;
    } else {
        this.handleOnMouseOver = null;
        this.handleOnMouseDown = func;
    }
};

/** Creates a square grid with equal number of smaller squares along each side. */
EtchASketch.prototype.createSquareGrid = function() {
    const boardNode = document.createElement('div');
    boardNode.classList.add('board');

    let rowNode, dataNode;
    for (let i = 0; i < this.numPerSide; i++) {
        rowNode = document.createElement('div');
        rowNode.classList.add('board-row');
        for (let j = 0; j < this.numPerSide; j++) {
            dataNode = document.createElement('div');
            dataNode.classList.add('board-square');

            // Add row and column number as data attribute (may not be necessary)
            dataNode.dataset.row = i;
            dataNode.dataset.col = j;

            // Add event listeners for 'mouseover' and 'mousedown' events
            dataNode.addEventListener('mouseover', function(e) {
                if (this.handleOnMouseOver)
                    this.handleOnMouseOver(e);
            }.bind(this), false);

            dataNode.addEventListener('mousedown', function(e) {
                console.log(`Mouse Down: r${i} : c${j}`);
                if (this.handleOnMouseDown)
                    this.handleOnMouseDown(e);
            }.bind(this), false);

            // Initialize background color
            dataNode.style.backgroundColor = this.selectedBGColor;

            rowNode.appendChild(dataNode);
        }
        boardNode.appendChild(rowNode);
    }
    this.boardContainerNode.appendChild(boardNode);
};

/** Clears the board and sets whole background-color to selected background color. */
EtchASketch.prototype.handleClearBoard = function() {
    // Remove all elements from container
    while (this.boardContainerNode.firstChild) 
        this.boardContainerNode.removeChild(this.boardContainerNode.firstChild);

    // Add new grid with prompted number of sides
    this.createSquareGrid(this.numPerSide);
};

/**
 * Event handler to change background-color to selected foreground color.
 * @param {Event} e 
 */
EtchASketch.prototype.addSelectedFGColor = function(e) {
    e.target.style.backgroundColor = this.selectedFGColor;
};

/**
 * Event handler to change background-color to selected background color.
 * @param {Event} e 
 */
EtchASketch.prototype.erase = function(e) {
    e.target.style.backgroundColor = this.selectedBGColor;
};

/**
 * Event handler to change background-color to random color.
 * @param {Event} e 
 */
EtchASketch.prototype.randomColor = function(e) {
    e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 25%)`;
};

/**
 * Makes the background-color of element darker or lighter by +/- rgb(10,10,10).
 * @param {Element} element Event with target element to change background-color style
 * @param {Boolean} isShadeDarker Shade darker if true, else shade lighter
 */
EtchASketch.prototype.shade = function(element, isShadeDarker) {
    // Get adjusted color values of element background-color: 'rgb(100, 100, 100)' => 'rgb(90, 90, 90)]
    const colorRGB = element.style.backgroundColor
        .match(/\d+/g) // Get array of three color value numbers as strings for RGB values
        .map(numStr => { // Adjust each color value
            if (isShadeDarker) {
                // Lower each color value by 10, limiting to 0. First convert from string to number.
                return Math.max(+numStr - 10, 0);
            } else {
                // Increase each color value by 10, limiting to 255. First convert from string to number.
                return Math.min(+numStr + 10, 255);
            }
        });

    // Add darker color to background-color style
    element.style.backgroundColor = `rgb(${colorRGB.join()})`;
};

(function() {
    const etchASketch = new EtchASketch(document.querySelector('.etch-a-sketch-container'));
    etchASketch.init();
    window.etchASketch = etchASketch;
})();