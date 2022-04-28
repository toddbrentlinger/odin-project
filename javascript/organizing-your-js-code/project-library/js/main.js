'use strict';

(function () {
    /**
     * Book constructor
     * @param {String} title 
     * @param {String} author 
     * @param {Number} pages 
     * @param {Boolean} read 
     */
    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = Book.prototype.id++;
        this.bookNode = null;
    }

    /* Static Properties */

    // ID given to new Book instance and then incremented for next new Book instance
    // Basic way to have unique ID for every new book added.
    Book.prototype.id = 0;

    // Base Book element to be cloned and data replaced with data from each instance 
    // before adding to DOM. Better than having to script the creation of every element
    // inside the '.book' class element whenever a new Book instance is added to DOM.
    Book.prototype.baseElement = document.querySelector('#book-base .book');

    /* Static Methods */

    /**
     * Creates and returns an element to hold the properties in the Book instance.
     * @param {Book} book Book instance
     * @returns {Element} HTML Element containing Book instance data
     */
     Book.prototype.createBookCardElement = function(book) {
        // Return if there is NO base element
        if (!Book.prototype.baseElement) return;

        book.bookNode = Book.prototype.baseElement.cloneNode(true);

        let tempElement;
        const addTextToElement = function(selectors, textContent) {
            tempElement = book.bookNode.querySelector(selectors);
            if (tempElement) {
                tempElement.textContent = textContent;
            }
        };

        // Title
        addTextToElement('.book-title', book.title);
        // Author
        addTextToElement('.book-author', `by ${book.author}`);
        // Pages
        addTextToElement('.book-pages', `${book.pages} pages`);
        // Read
        addTextToElement('.book-read', book.read ? 'Has Read' : 'Has Not Yet Read');

        // Event Listeners - Cover
        tempElement = book.bookNode.querySelector('.book-cover');
        if (tempElement) {
            tempElement.addEventListener('transitionend', function() {
                console.log(`Transition End! Book has 'open' class? ${book.bookNode.classList.contains('open')}`);
            }.bind(book), false);
        }

        // Event Listeners - Inside
        tempElement = book.bookNode.querySelector('.book-inside');
        tempElement.addEventListener('click', e => {
            console.log(`${e.target}`);
            e.stopPropagation();
        });

        tempElement.querySelector('.book-inside-cancel')
            .addEventListener('click', book.close.bind(book), false);

        // Event Listeners - Book
        book.bookNode.addEventListener('click', book.toggleOpen.bind(book), false);

        return book.bookNode;
    };
    
    /**
     * Returns a string representation of the Book instance.
     * @returns {String}
     */
    Book.prototype.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has read' : 'not read yet'}, id: ${this.id}`;
    };

    /** Opens the cover of the HTML element for the Book instance. */
    Book.prototype.toggleOpen = function() {
        // Add edit form to inside element of book
        // Add '.open' class to element to trigger cover opening transition
        this.bookNode.classList.toggle('open');
    };

    /** Closes the cover of the HTML element for the Book instance. */
    Book.prototype.close = function(e) {
        e.stopPropagation();
        // Remove '.open' class from element to trigger cover close transition
        this.bookNode.classList.remove('open');
        // Remove edit form from inside of book when cover closes using transitionend event
    };

    /** Library constructor */
    function Library() {
        this.listElement = document.getElementById('books-list');
        this.books = [];

        // Add any books passed as arguments
        [...arguments].forEach(arg => {
            // Check if argument is an instance of Book
            if (arg.constructor === Book) {
                this.addBook(arg);
            }
        });
    }

    /** Initializes Library instance */
    Library.prototype.init = function() {
        this.updateDisplay();
    };

    /**
     * Adds a Book instance to the library.
     * @param {Book} newBook 
     * @returns {Boolean} Returns true if successfully added book to library, else returns false.
     */
    Library.prototype.addBook = function(newBook) {
        // Return false if book title already exists in library
        this.books.forEach(book => {
            if (book.title === newBook.title) {
                return false;
            }
        });
        this.books.push(newBook);
        return true;
    };

    /**
     * Removes a book from the library with matching book ID. Returns the Book 
     * instance that was removed OR undefined if could NOT remove.
     * @param {Number|String} bookID 
     * @returns {Element|undefined} 
     */
    Library.prototype.removeBook = function(bookID) {
        // Return if bookID is not a number
        if (isNaN(bookID)) return;
        // If bookID is a string, convert to a number
        if (typeof bookID === 'string') {
            bookID = +bookID;
        }

        const bookIndex = this.books.findIndex(book => book.id === bookID);
        // Return if NO book found with bookID
        if (bookIndex === -1) return;

        return this.books.splice(bookIndex);
    };

    Library.prototype.updateDisplay = function() {
        // Clear books from list node, leaving only special book that creates new books
        while(this.listElement.lastElementChild.id !== 'add-new-book') {
            this.listElement.removeChild(this.listElement.lastElementChild);
        }
        // Add updated books to list node
        this.books.forEach(book => {
            this.listElement.appendChild(Book.prototype.createBookCardElement(book));
        });
    };
    
    const library = new Library(
        new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
        new Book('Frankenstein', 'Mary Shelley', 216, false),
        new Book('Of Mice and Men', 'John Steinbeck', 112, true),
        new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 312, true),
        new Book('Treasure Island', 'Robert Louis Stevenson', 272, false),
        new Book('Pride and Prejudice', 'Jane Austen', 368, false),
    );
    library.init();
    library.books.forEach(book => console.log(book.info()));
    window.library = library;
})();