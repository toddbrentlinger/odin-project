'use strict';

(function() {
    class FormInput {
        constructor(labelElement) {
            this.labelTitleElement = labelElement.querySelector('.label-title');
            this.inputElement = labelElement.querySelector('input');
            this.errorElement = labelElement.querySelector('.error');

            this.init();
        }

        init() {
            this.inputElement.addEventListener('input', (e) => {
                if (this.inputElement.validity.valid) {
                    // Hide error
                    this.errorElement.textContent = '';
                    this.errorElement.className = 'error';
                } else {
                    // Show error
                    this.showError();
                }
            }, false);

            this.inputElement.addEventListener('blur', (e) => {
                //console.log(`Blur! ${this.inputElement.id}\n: Validity: ${this.inputElement.reportValidity()}`);
            }, false);
        }

        showError() {
            const ERRORS = {
                badInput: 'Must be a number!',
                rangeUnderflow: 'Must be greater than 0!',
                typeMismatch: 'Wrong type!',
                valueMissing: 'Required!',
            };

            // Add each lised error if invalid
            this.errorElement.textContent = Object.entries(ERRORS) // Get [key, value] pairs of ERRORS in array
                .filter(entry => this.inputElement.validity[entry[0]]) // Filter by invalid errors from input element
                .map(entry => entry[1]) // Map to array of error messages to display
                .join('\n'); // Join array of messages with newline separating them

            this.errorElement.className = 'error active';

            // TESTING
            console.log(this.inputElement.validity);
        }
    }

    class BookComponent {
        constructor(book, deleteCallback) {
            this.book = book;
            this.deleteCallback = deleteCallback;
            this.element = null;
            this.formInputs = [];
        }

        // Base Book element to be cloned and data replaced with data from each instance 
        // before adding to DOM. Better than having to script the creation of every element
        // inside the '.book' class element whenever a new Book instance is added to DOM.
        static baseElement = document.querySelector('#book-base .book');

        /**
         * 
         * @param {Element} addNewBookCardElement Element of special book to add new books
         * @param {Function} submitCallback Method runs when form is submitted to create new Book  
         */
        static setupAddNewBookCardElement(addNewBookCardElement, submitCallback) {
            // Add event listener to book cover to toggle open/close transition
            addNewBookCardElement.addEventListener('click', () => addNewBookCardElement.classList.toggle('open'), false);

            let tempElement = addNewBookCardElement.querySelector('.book-inside');

            // Fixes issue with click event listener of book closing running when inside is clicked
            // Stops click event bubbling up to book cover ancestor
            tempElement.addEventListener('click', e => e.stopPropagation(), false);

            addNewBookCardElement.querySelectorAll('label').forEach(label => {
                // Create FormInput element and add to list (excluding checkbox type)
                if (!label.querySelector('input[type="checkbox"]')) {
                    new FormInput(label);
                }
            });

            // Cancel Button
            tempElement.querySelector('.book-inside-cancel')
                .addEventListener('click', () => addNewBookCardElement.classList.remove('open'), false);

            // Form OnSubmit Handler
            tempElement = tempElement.querySelector('form');
            tempElement.addEventListener('submit', submitCallback, false);

            // Form Reset Button
            addNewBookCardElement.querySelector('.book-btn-reset')
                .addEventListener('click', () => tempElement.reset(), false);
        }

        handleUpdateSubmit(e) {
            const bIsFormValid = this.formInputs.every((formInput) => formInput.inputElement.checkValidity());
            if (bIsFormValid) {
                // Prevent form from actually submitting to 'action' attribute since 
                // there is no external server or database used to handle the books.
                e.preventDefault();

                // Update Book instance with new set of valid values from form
                this.updateBook();
            } else {
                e.preventDefault();
            }
        }

        handleDeleteClick() {
            // Remove book from DOM
            this.element.remove();

            this.deleteCallback(this.book);
        }

        /**
         * Creates and returns an element that displays the properties in, and provides form to update/delete, 
         * a Book instance.
         * @param {Function} deleteCallback Callback function to be called when user deletes book
         * @returns {Element} HTML Element containing Book instance data
         */
        createBookCardElement(deleteCallback) {
            if (this.element) {
                console.log('Book card element already created');
                return this.element;
            } else if (!BookComponent.baseElement) { // Return if there is NO base element
                console.error('NO base element to clone and add Book instance to DOM');
                return;
            }

            // Create clone of base Book element
            this.element = BookComponent.baseElement.cloneNode(true);

            // Book Cover

            // Add event listener to book cover to toggle open/close transition
            this.element.addEventListener('click', this.toggleOpenCover.bind(this), false);

            // Book Inside

            // Inside element reference
            const insideBookElement = this.element.querySelector('.book-inside');

            // Fixes issue with click event listener of book closing running when inside is clicked
            // Stops click event bubbling up to book cover ancestor
            insideBookElement.addEventListener('click', e => e.stopPropagation(), false);

            // Cancel/Close Button event listener
            this.element.querySelector('.book-inside-cancel')
                .addEventListener('click', this.closeCover.bind(this), false);

            // Delete Button event listener
            this.element.querySelector('.book-btn-delete')
                .addEventListener('click', this.handleDeleteClick.bind(this), false);
            
            // Submit button reference
            const submitBtnElement = this.element.querySelector('.book-btn-submit');

            // Add id to 'form' attribute in submit button
            submitBtnElement.setAttribute('form', submitBtnElement.getAttribute('form') + this.book.id.toString());

            // Form element reference
            const formElement = this.element.querySelector('form');

            // Append Book id to form element id
            formElement.id = formElement.id.match(/.+-/)[0] + this.book.id;

            // Append Book id to label attributes
            formElement.querySelectorAll('label').forEach(label => {
                // Label 'for' attribute
                label.htmlFor = label.htmlFor.match(/.+-/)[0] + this.book.id;

                // Create FormInput element and add to list (excluding checkbox type)
                if (!label.querySelector('input[type="checkbox"]')) {
                    this.formInputs.push(new FormInput(label));
                }
            });

            // Append Book id to input attributes
            formElement.querySelectorAll('input').forEach(input => {
                input.id = input.id.match(/.+-/)[0] + this.book.id;
            });

            // Submit/Update Button
            formElement.addEventListener('submit', this.handleUpdateSubmit.bind(this), false);

            // Add Book instance properties to Book cover
            this.updateCover();
            
            // Add Book instance properties to Book form
            this.updateFormFields();

            return this.element;
        }

        /** Toggle open the cover of the HTML element for the Book instance. */
        toggleOpenCover(e) {
            // Add '.open' class to element to trigger cover opening transition
            this.element.classList.toggle('open');
        }

        /** Closes the cover of the HTML element for the Book instance. */
        closeCover() {
            // Remove '.open' class from element to trigger cover close transition
            this.element.classList.remove('open');
        }

        /** Updates Book cover to display current values of Book instance properties with  */
        updateCover() {
            // Function to add text content to element with specified selectors
            let tempElement;
            const addTextToElement = function(selectors, textContent) {
                tempElement = this.element.querySelector(selectors);
                if (tempElement) {
                    tempElement.textContent = textContent;
                }
            }.bind(this);

            // Add Book instance properties to book cover
            addTextToElement('.book-title', this.book.title);
            addTextToElement('.book-author', `by ${this.book.author}`);
            addTextToElement('.book-pages', `${this.book.pages} pages`);
            addTextToElement('.book-read', this.book.read ? 'Has Read' : 'Has Not Yet Read');

            // Display bookmark only if Book instance property 'read' is false
            if (this.book.read) {
                this.element.querySelector('.book-bookmark-icon').classList.add('hide');
            } else {
                this.element.querySelector('.book-bookmark-icon').classList.remove('hide');
            }
        }

        /** Updates Book form to display current values of Book instance properties with unique element Id fields. */
        updateFormFields() {
            this.element.querySelectorAll('input').forEach((formInput) => {
                // Make sure input value is blank to clear form inputs after update
                formInput.value = '';

                // Get name attribute from input that matches the Book property name
                const inputName = formInput.name.match(/.+(?=-?)/)[0]; // Get name except '-' at the end

                // Input placeholder with existing value of Book instance properties
                // If input is checkbox, set checked attribute instead.
                if (inputName === 'read') {
                    formInput.checked = this.book.read;
                } else {
                    formInput.placeholder = this.book[inputName];
                }
            });
        }

        updateBook() {
            // Assign each input value in form to corresponding Book instance 
            // properties depending on the type attribute of the input element
            this.element.querySelectorAll('form input').forEach((input) => {
                switch(input.type) {
                    case 'text':
                        this.book[input.name] = input.value || input.placeholder;
                        break;
                    case 'number':
                        this.book[input.name] = (input.value === '' ? +input.placeholder : +input.value);
                        break;
                    case 'checkbox':
                        this.book[input.name] = input.checked;
                        break;
                    default:
                        console.error(`Input type "${input.type}" NOT accounted for!`);
                }
            });

            // Update Book instance element with updated values of Book instance properties
            this.updateCover();
            this.updateFormFields();
            
            // Close book cover
            this.closeCover();
        }
    }

    class Book {
        /**
         * @constructor
         * @param {String} title 
         * @param {String} author 
         * @param {Number} pages 
         * @param {Boolean} read 
         */
        constructor(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
            // Set to static variable which is incremented for next instance
            this.id = Book.id++;
        }

        // Static Properties

        // ID given to new Book instance and then incremented for next new Book instance
        // Simple way to have unique ID for every new book added.
        static id = 0;

        // Public Methods

        /**
         * Returns a string representation of the Book instance.
         * @returns {String}
         */
        info() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has read' : 'not read yet'}, id: ${this.id}`;
        }
    }

    class Library {
        /**
         * Library constructor that adds any number of Book instances passed as arguments.
         * @constructor
         * @param {...Book} book
         */
        constructor(book) {
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
        init() {
            // Setup add new book element
            BookComponent.setupAddNewBookCardElement(
                document.getElementById('add-new-book'), this.handleAddNewBookSubmit.bind(this)
            );

            // Display all books in library on DOM
            this.displayBooks();
        }

        /**
         * Adds a Book instance to the library.
         * @param {Book} newBook 
         * @returns {Boolean} Returns true if successfully added book to library, else returns false.
         */
        addBook(newBook) {
            // Return false if book title already exists in library
            this.books.forEach(book => {
                if (book.title === newBook.title) {
                    console.error(`Book with title "${newBook.title}" already exists in library!`);
                    return false;
                }
            });
            
            this.books.push(newBook);

            return true;
        }

        /**
         * Removes a book from the library with matching book ID. Returns the Book 
         * instance that was removed OR undefined if could NOT remove.
         * @param {Number|String} bookId 
         * @returns {Element|undefined} 
         */
        removeBook(bookId) {
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

            // Remove book from list of all books in Library instance
            return this.books.splice(bookIndex, 1);
        }

        /** Creates HTML element of each Book instance and adds to list element. */
        displayBooks() {
            // Clear books from list node, leaving only special book that creates new books
            while(this.listElement.lastElementChild.id !== 'add-new-book') {
                this.listElement.removeChild(this.listElement.lastElementChild);
            }
            // Add books to list node
            this.books.forEach(book => {
                // Create element for Book instance
                this.listElement.appendChild(
                    new BookComponent(book, this.handleDelete.bind(this)).createBookCardElement()
                );
            });
        }

        /**
         * Callback function to handle user removing the book from the Library instance.
         * @param {Book} book 
         */
        handleDelete(book) {
            this.removeBook(book.id);
        }

        /**
         * Callback function to handle user adding new book to Library instance.
         * @param {Event} e 
         */
        handleAddNewBookSubmit(e) {
            if (!e.target.checkValidity()) {
                e.preventDefault();

                // Form Constraint Validation
                e.target.reportValidity();

                return;
            }

            // Prevent form from actually submitting to 'action' attribute since 
            // there is no external server or database used to handle the books.
            e.preventDefault();

            // Get all input values in form stored in object
            const formInputValues = {}; // Key: input 'name' attribute - Value: input 'value'
            let input;
            for (let i = 0; i < e.target.elements.length; i++) {
                input = e.target.elements.item(i);
                switch(input.type) {
                    case 'text':
                        formInputValues[input.name] = input.value;
                        break;
                    case 'number':
                        formInputValues[input.name] = +input.value;
                        break;
                    case 'checkbox':
                        formInputValues[input.name] = input.checked;
                        break;
                    default:
                        console.error(`Input type "${input.type} NOT accounted for in add new book form!"`);
                }
            }
            
            // Create new Book instance with form values AND add to the library
            const newBook = new Book(formInputValues.title, formInputValues.author, formInputValues.pages, formInputValues.read);
            this.addBook(newBook);

            // Display new book
            this.listElement.appendChild(
                new BookComponent(newBook, this.handleDelete.bind(this)).createBookCardElement()
            );

            // Reset form to clear values for adding another book
            e.target.reset();
        }
    }

    const library = new Library(
        new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
        new Book('Frankenstein', 'Mary Shelley', 216, false),
        new Book('Of Mice and Men', 'John Steinbeck', 112, true),
        new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 312, true),
        new Book('Treasure Island', 'Robert Louis Stevenson', 272, false),
        new Book('Pride and Prejudice', 'Jane Austen', 368, false),
    );
    library.init();
})();