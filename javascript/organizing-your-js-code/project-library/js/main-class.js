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
            this.element = null;
            this.formInputs = [];
        }

        // Base Book element to be cloned and data replaced with data from each instance 
        // before adding to DOM. Better than having to script the creation of every element
        // inside the '.book' class element whenever a new Book instance is added to DOM.
        static baseElement = document.querySelector('#book-base .book');

        handleUpdateSubmit(e) {
            const bIsFormValid = this.formInputs.every((formInput) => formInput.inputElement.checkValidity());
            if (bIsFormValid) {
                e.preventDefault();

                // Update Book instance with new set of valid values from form
                this.updateBook();
            } else {
                e.preventDefault();
            }
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

            // Add Book instance properties to Book cover
            this.updateCover();

            // Add Book instance properties to Book form
            this.updateFormFields();

            // Book Cover

            // Add event listener to book cover to toggle open/close transition
            this.element.addEventListener('click', this.toggleOpenCover.bind(this), false);

            // Book Inside

            // Add id to 'form' attribute in submit button
            // Submit button reference
            let tempElement = this.element.querySelector('.book-btn-submit')
                .setAttribute('form', tempElement.getAttribute('form') + this.book.id.toString());

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
                .addEventListener('click', () => deleteCallback(book), false);

            // Form element reference
            const formElement = this.element.querySelector('form');

            // Append Book id to form element id
            formElement.id = formElement.id.match(/.+-/)[0] + this.id;

            // Append Book id to label attributes
            formElement.querySelectorAll('label').forEach(label => {
                // Label 'for' attribute
                label.htmlFor = label.htmlFor.match(/.+-/)[0] + this.id;

                // Create FormInput element and add to list (excluding checkbox type)
                if (!label.querySelector('input[type="checkbox"]')) {
                    this.formInputs.push(new FormInput(label));
                }
            });

            // Append Book id to input attributes
            formElement.querySelectorAll('input').forEach(input => {
                input.id = input.id.match(/.+-/)[0] + this.id;
            });

            // Submit/Update Button
            formElement.addEventListener('submit', this.handleUpdateSubmit.bind(this), false);

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
            // Get form element
            const formElement = this.bookNode.querySelector('form');

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
            this.close();
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
            // Initialized to null so event listeners are only added at first creation and NOT every update
            this.bookNode = null;
            this.formInputs = [];
        }

        // Static Properties

        // ID given to new Book instance and then incremented for next new Book instance
        // Simple way to have unique ID for every new book added.
        static id = 0;

        // Base Book element to be cloned and data replaced with data from each instance 
        // before adding to DOM. Better than having to script the creation of every element
        // inside the '.book' class element whenever a new Book instance is added to DOM.
        static baseElement = document.querySelector('#book-base .book');

        // Static Methods

        /**
         * Creates and returns an element that displays the properties in, and provides form to update/delete, 
         * a Book instance.
         * @param {Book} book Book instance
         * @param {Function} deleteCallback Callback function to be called when user deletes book
         * @returns {Element} HTML Element containing Book instance data
         */
        static createBookCardElement(book, deleteCallback) {
            const bFirstCreation = book.bookNode === null;

            // Clone base Book element if this Book instance element is null
            if (bFirstCreation) {
                // Return if there is NO base element
                if (!Book.baseElement) {
                    console.error('NO base element to clone and add Book instance to DOM');
                    return;
                }

                // Create clone of base Book element
                book.bookNode = Book.baseElement.cloneNode(true);
                
                // Add event listener to book cover to toggle open/close transition
                book.bookNode.addEventListener('click', book.toggleOpen.bind(book), false);
            }
            
            // Add Book instance properties to Book cover
            book.updateCover();

            // Book Inside
            
            // Add Book instance properties to Book form
            book.updateFormFields();

            // Add id to 'form' attribute in submit button
            // Submit button reference
            let tempElement = book.bookNode.querySelector('.book-btn-submit')
                .setAttribute('form', tempElement.getAttribute('form') + book.id.toString());

            // Inside element reference
            tempElement = book.bookNode.querySelector('.book-inside');

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
                book.bookNode.querySelector('form').addEventListener('submit', (e) => {
                    const bIsFormValid = book.formInputs.every((formInput) => formInput.inputElement.checkValidity());
                    if (bIsFormValid) {
                        e.preventDefault();
                        book.update();
                    } else {
                        e.preventDefault();
                    }
                }, false);
            }

            return book.bookNode;
        }

        /**
         * 
         * @param {Element} addNewBookCardElement Element of special book to add new books
         * @param {Function} submitCallback Method runs when form is submitted to create new Book  
         */
        static setupAddNewBookCardElement(addNewBookCardElement, submitCallback) {
            // Return if there is NO base element
            if (!Book.baseElement) {
                console.error('NO base element to clone and add Book instance to DOM');
                return;
            }
            
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

        // Public Methods

        /**
         * Returns a string representation of the Book instance.
         * @returns {String}
         */
        info() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has read' : 'not read yet'}, id: ${this.id}`;
        }

        /** Toggle open the cover of the HTML element for the Book instance. */
        toggleOpen() {
            // Add '.open' class to element to trigger cover opening transition
            this.bookNode.classList.toggle('open');
        }

        /** Closes the cover of the HTML element for the Book instance. */
        close() {
            // Remove '.open' class from element to trigger cover close transition
            this.bookNode.classList.remove('open');
        }

        /** Updates Book cover to display current values of Book instance properties with  */
        updateCover() {
            // Function to add text content to element with specified selectors
            let tempElement;
            const addTextToElement = function(selectors, textContent) {
                tempElement = this.bookNode.querySelector(selectors);
                if (tempElement) {
                    tempElement.textContent = textContent;
                }
            }.bind(this);

            // Add Book instance properties to book cover
            addTextToElement('.book-title', this.title);
            addTextToElement('.book-author', `by ${this.author}`);
            addTextToElement('.book-pages', `${this.pages} pages`);
            addTextToElement('.book-read', this.read ? 'Has Read' : 'Has Not Yet Read');

            // Display bookmark only if Book instance property 'read' is false
            if (this.read) {
                this.bookNode.querySelector('.book-bookmark-icon').classList.add('hide');
            } else {
                this.bookNode.querySelector('.book-bookmark-icon').classList.remove('hide');
            }
        }

        /** Updates Book form to display current values of Book instance properties with unique element Id fields. */
        updateFormFields() {
            // Get form element
            const formElement = this.bookNode.querySelector('form');

            // Append Book id to form element id
            formElement.id = formElement.id.match(/.+-/)[0] + this.id;

            // Append Book id to label attributes
            formElement.querySelectorAll('label').forEach(label => {
                // Label 'for' attribute
                label.htmlFor = label.htmlFor.match(/.+-/)[0] + this.id;

                // Create FormInput element and add to list (excluding checkbox type)
                if (!label.querySelector('input[type="checkbox"]')) {
                    this.formInputs.push(new FormInput(label));
                }
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
        }

        /** Updates Book instance to use values on form inside book element form. */
        update() {
            // Assign each input value in form to corresponding Book instance 
            // properties depending on the type attribute of the input element
            this.bookNode.querySelectorAll('form input').forEach((input) => {
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
            //Book.createBookCardElement(this);
            this.updateCover();
            this.updateFormFields();
            
            // Close book cover
            this.close();
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
            Book.setupAddNewBookCardElement(
                document.getElementById('add-new-book'), this.handleAddNewBookSubmit.bind(this)
            );

            // Display all books in library on DOM
            //this.displayBooks();
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

            // Create element for Book instance
            const bookCardElement = Book.createBookCardElement(newBook, this.handleDelete.bind(this));
            
            // // Insert new book element at the top of the list
            // this.listElement.appendChild(bookCardElement);

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

            // Remove book from DOM
            this.books[bookIndex].bookNode.remove();

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
            let bookCardElement;
            this.books.forEach(book => {
                // Create element for Book instance
                bookCardElement = Book.createBookCardElement(book, this.handleDelete.bind(this));

                this.listElement.appendChild(bookCardElement);
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
            // Prevent form from actually submitting to 'action' attribute since 
            // there is no external server or database used to handle the books.
            e.preventDefault();

            // Form Constraint Validation
            e.target.reportValidity();

            // Get all input values in form stored in object
            // TODO: Use e.target.elements instead of querying all input tags
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
            this.addBook(new Book(formInputValues.title, formInputValues.author, formInputValues.pages, formInputValues.read));

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