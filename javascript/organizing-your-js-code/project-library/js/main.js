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
        // Set to static variable which is incremented for next instance
        this.id = Book.prototype.id++;
        // Initialized to null so event listeners are only added at first creation and NOT every update
        this.bookNode = null;
    }

    // Static Properties

    // ID given to new Book instance and then incremented for next new Book instance
    // Simple way to have unique ID for every new book added.
    Book.prototype.id = 0;

    // Base Book element to be cloned and data replaced with data from each instance 
    // before adding to DOM. Better than having to script the creation of every element
    // inside the '.book' class element whenever a new Book instance is added to DOM.
    Book.prototype.baseElement = document.querySelector('#book-base .book');

    // Static Methods

    /**
     * Creates and returns an element to hold the properties in the Book instance.
     * @param {Book} book Book instance
     * @param {Function} deleteCallback Callback function to be called when user deletes book
     * @returns {Element} HTML Element containing Book instance data
     */
     Book.prototype.createBookCardElement = function(book, deleteCallback) {
        const bFirstCreation = book.bookNode === null;

        // Clone base Book element if this Book instance element is null
        if (bFirstCreation) {
            // Return if there is NO base element
            if (!Book.prototype.baseElement) {
                console.error('NO base element to clone and add Book instance to DOM');
                return;
            }

            // Create clone of base Book element
            book.bookNode = Book.prototype.baseElement.cloneNode(true);
            
            // Add event listener to book cover to toggle open/close transition
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
        // Add Book instance properties to book cover
        addTextToElement('.book-title', book.title);
        addTextToElement('.book-author', `by ${book.author}`);
        addTextToElement('.book-pages', `${book.pages} pages`);
        addTextToElement('.book-read', book.read ? 'Has Read' : 'Has Not Yet Read');

        // Book Cover

        // Display bookmark only if Book instance property 'read' is false
        if (book.read) {
            book.bookNode.querySelector('.book-bookmark-icon').classList.add('hide');
        } else {
            book.bookNode.querySelector('.book-bookmark-icon').classList.remove('hide');
        }

        // Book Inside

        tempElement = book.bookNode.querySelector('.book-inside');

        // Setup form attributes to be unique for a Book instance
        book.setupForm(tempElement.querySelector('form'));

        // Add event listeners if first time element is created
        if (bFirstCreation) {
            // Fixes issue with click event listener of book closing running when inside is clicked
            // Stops click event bubbling up to book cover ancestor
            tempElement.addEventListener('click', e => e.stopPropagation(), false);

            // Cancel Button Button
            tempElement.querySelector('.book-inside-cancel')
                .addEventListener('click', book.close.bind(book), false);

            // Delete Button
            book.bookNode.querySelector('.book-btn-delete')
                .addEventListener('click', () => deleteCallback(book), false);

            // Submit/Update Button
            book.bookNode.querySelector('.book-btn-submit')
                .addEventListener('click', book.update.bind(book), false);
        }

        return book.bookNode;
    };

    /**
     * 
     * @param {Function} submitCallback Method runs when form is submitted to create new Book  
     */
    Book.prototype.createAddNewBookCardElement = function(submitCallback) {
        // Return if there is NO base element
        if (!Book.prototype.baseElement) {
            console.error('NO base element to clone and add Book instance to DOM');
            return;
        }

        // Get special add new book element from DOM
        const bookNode = document.getElementById('add-new-book');
        
        // Add event listener to book cover to toggle open/close transition
        bookNode.addEventListener('click', () => bookNode.classList.toggle('open'), false);

        let insideElement = bookNode.querySelector('.book-inside');
        // Fixes issue with click event listener of book closing running when inside is clicked
        // Stops click event bubbling up to book cover ancestor
        insideElement.addEventListener('click', e => e.stopPropagation(), false);

        // Cancel Button Button
        insideElement.querySelector('.book-inside-cancel')
            .addEventListener('click', () => bookNode.classList.remove('open'), false);

        // Submit/Update Button
        bookNode.querySelector('.book-btn-submit')
            .addEventListener('click', submitCallback, false);

        return bookNode;
    }
    
    // Methods

    /**
     * Returns a string representation of the Book instance.
     * @returns {String}
     */
    Book.prototype.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has read' : 'not read yet'}, id: ${this.id}`;
    };

    /** Toggle open the cover of the HTML element for the Book instance. */
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
     * Updates Book form to display current values of Book instance properties with unique element Id fields.
     * @param {Element} formElement 
     */
    Book.prototype.setupForm = function(formElement) {
        // Append Book id to form element id
        formElement.id = formElement.id.match(/.+-/)[0] + this.id;

        // Append Book id to label attributes
        formElement.querySelectorAll('label').forEach(label => {
            // Label 'for' attribute
            label.htmlFor = label.htmlFor.match(/.+-/)[0] + this.id;
        });

        // Append Book id to input attributes
        let inputName;
        formElement.querySelectorAll('input').forEach(input => {
            // Make sure input value is blank to clear form inputs after update
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
            
            // Append Book Id to input id attribute
            input.id = input.id.match(/.+-/)[0] + this.id;
        });
    };

    /** Updates Book instance to use values on form inside book element form. */
    Book.prototype.update = function() {
        // Assign each input value in form to corresponding Book instance 
        // properties depending on the type attribute of the input element
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
                    console.error(`Input type "${input.type}" NOT accounted for!`);
            }
        });

        // Update Book instance element with updated values of Book instance properties
        Book.prototype.createBookCardElement(this);
        
        // Close book cover
        this.close();
    };

    /**
     * Library constructor that adds any number of Book instances passed as arguments.
     * @param {...Book} book
     */
    function Library(book) {
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
        this.setupNewBookForm(document.getElementById('add-new-book'));

        // Display all books in library on DOM
        this.displayBooks();
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
                console.error(`Book with title "${newBook.title}" already exists in library!`);
                return false;
            }
        });
        
        this.books.push(newBook);
        return true;
    };

    /**
     * Removes a book from the library with matching book ID. Returns the Book 
     * instance that was removed OR undefined if could NOT remove.
     * @param {Number|String} bookId 
     * @returns {Element|undefined} 
     */
    Library.prototype.removeBook = function(bookId) {
        // Return if bookId is not a number
        if (isNaN(bookId)) return;
        // If bookId is a string, convert to a number
        if (typeof bookId === 'string') {
            bookId = +bookId;
        }

        // Find index in books list of book with matching id
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        // Return if NO book found with bookId
        if (bookIndex === -1) {
            console.error(`No book found with book id: ${bookId}`);
            return;
        }

        // Remove book from DOM
        this.books[bookIndex].bookNode.remove();

        // Remove book from list of all books in Library instance
        return this.books.splice(bookIndex, 1);
    };

    /** Creates HTML element of each Book instance and adds to list element. */
    Library.prototype.displayBooks = function() {
        // Clear books from list node, leaving only special book that creates new books
        while(this.listElement.lastElementChild.id !== 'add-new-book') {
            this.listElement.removeChild(this.listElement.lastElementChild);
        }
        // Add books to list node
        let bookCardElement;
        this.books.forEach(book => {
            // Create element for Book instance
            bookCardElement = Book.prototype.createBookCardElement(book, this.handleDelete.bind(this));

            this.listElement.appendChild(bookCardElement);
        });
    };

    /**
     * Callback function to handle user removing the book from the Library instance.
     * @param {Book} book 
     */
    Library.prototype.handleDelete = function(book) {
        this.removeBook(book.id);
    };

    /**
     * Add event listeners to special book used to add new Books to the Library instance.
     * @param {Element} bookElement 
     */
    Library.prototype.setupNewBookForm = function(bookElement) {
        this.listElement.appendChild(Book.prototype.createAddNewBookCardElement(() => {}));
        const addNewBookElement = document.getElementById('add-new-book');
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

    // Testing
    library.books.forEach(book => console.log(book.info()));
    window.library = library;
})();