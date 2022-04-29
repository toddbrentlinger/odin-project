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
        this.coverColor = `hsla(${Math.floor(Math.random() * 361)}, 50%, 50%, 0.5)`;
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
     * @param {Function} deleteCallback
     * @returns {Element} HTML Element containing Book instance data
     */
     Book.prototype.createBookCardElement = function(book, deleteCallback) {
        // Return if there is NO base element
        if (!Book.prototype.baseElement) return;

        const bFirstCreation = book.bookNode === null;

        // Clone base Book element if this Book instance element is null
        if (bFirstCreation) {
            book.bookNode = Book.prototype.baseElement.cloneNode(true);
            
            book.bookNode.addEventListener('click', book.toggleOpen.bind(book), false);
        }
        
        // Add Book instance properties to Book cover

        // Function to add text content to element with specified selectors
        let tempElement;
        const addTextToElement = function(selectors, textContent) {
            tempElement = book.bookNode.querySelector(selectors);
            if (tempElement) {
                tempElement.textContent = textContent;
            }
        };
        addTextToElement('.book-title', book.title);
        addTextToElement('.book-author', `by ${book.author}`);
        addTextToElement('.book-pages', `${book.pages} pages`);
        addTextToElement('.book-read', book.read ? 'Has Read' : 'Has Not Yet Read');

        // Cover

        tempElement = book.bookNode.querySelector('.book-cover');

        // Display bookmark only if Book instance property 'read' is false
        if (book.read) {
            book.bookNode.querySelector('.book-bookmark-icon').classList.add('hide');
        } else {
            book.bookNode.querySelector('.book-bookmark-icon').classList.remove('hide');
        }

        // Inside

        tempElement = book.bookNode.querySelector('.book-inside');

        // Form
        book.setupForm(tempElement.querySelector('form'));

        // Add event listeners if first time element is created
        if (bFirstCreation) {
            // Inside - Event Listeners

            // Fixes issue with click event listener of book closing running when inside is clicked
            tempElement.addEventListener('click', e => {
                e.stopPropagation();
                console.log(`${e.target}`);
            }, false);

            // Cancel Button
            tempElement.querySelector('.book-inside-cancel')
                .addEventListener('click', book.close.bind(book), false);

            // Event Listener - Delete
            book.bookNode.querySelector('.book-btn-delete').addEventListener('click', function() {
                deleteCallback(book);
            });

            // Event Listener - Submit
            book.bookNode.querySelector('.book-btn-submit')
                .addEventListener('click', book.update.bind(book));
        }

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
        // Add '.open' class to element to trigger cover opening transition
        this.bookNode.classList.toggle('open');
    };

    /** Closes the cover of the HTML element for the Book instance. */
    Book.prototype.close = function() {
        // Remove '.open' class from element to trigger cover close transition
        this.bookNode.classList.remove('open');
    };

    /**
     * Updates base form tag element to 
     * @param {Element} formElement 
     */
    Book.prototype.setupForm = function(formElement) {
        // Append Book id to form element
        formElement.id = formElement.id.match(/.+-/)[0] + this.id;

        // Append Book id to label attributes
        formElement.querySelectorAll('label').forEach(label => {
            // Label 'for' attribute
            label.htmlFor = label.htmlFor.match(/.+-/)[0] + this.id;
        });

        // Append Book id to input attributes
        let inputName;
        formElement.querySelectorAll('input').forEach(input => {
            // Make sure input value is blank
            input.value = '';

            // Get name attribute from input that matches the Book property name
            inputName = input.name.match(/.+(?=-?)/)[0]; // Get name except '-' at the end

            // Input placeholder with existing value of Book instance properties
            // If input is checkbox, set checked attribute instead.
            if (inputName === 'read') {
                input.checked = this.read;
            } else {
                input.placeholder = this[inputName];
            }
            
            // Input id attribute
            input.id = input.id.match(/.+-/)[0] + this.id;
        });
    };

    Book.prototype.update = function() {
        // Assign each input value to Book instance properties
        this.bookNode.querySelectorAll('form input').forEach(input => {
            switch(input.type) {
                case 'text':
                    this[input.name] = input.value || input.placeholder;
                    break;
                case 'number':
                    this[input.name] = (input.value === '' ? +input.placeholder : +input.value);
                    break;
                case 'checkbox':
                    this[input.name] = input.checked;
                    break;
                default:
            }
        });

        // Update HTML element with new values of Book instance properties
        // Replace current book element with updated book element in DOM
        // this.bookNode.replaceWith(Book.prototype.createBookCardElement(this));
        Book.prototype.createBookCardElement(this);
        
        // Close book cover
        this.close();
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

        // Remove book from DOM
        this.books[bookIndex].bookNode.remove();

        // Remove book from list of all books
        return this.books.splice(bookIndex, 1);
    };

    Library.prototype.updateDisplay = function() {
        // Clear books from list node, leaving only special book that creates new books
        while(this.listElement.lastElementChild.id !== 'add-new-book') {
            this.listElement.removeChild(this.listElement.lastElementChild);
        }
        // Add updated books to list node
        let bookCardElement;
        this.books.forEach(book => {
            // Create element for Book instance
            bookCardElement = Book.prototype.createBookCardElement(book, this.handleDelete.bind(this));

            this.listElement.appendChild(bookCardElement);
        });
    };

    Library.prototype.handleDelete = function(book) {
        this.removeBook(book.id);
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