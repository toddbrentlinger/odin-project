'use strict';

/**
 * 
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
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has read' : 'not read yet'}`;
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info());

// Tasks

// 1. Working with prototype
{
    let animal = {
        jumps: null
    };
    let rabbit = {
        __proto__: animal,
        jumps: true
    };

    alert(rabbit.jumps); // ? (1) true

    delete rabbit.jumps;

    alert(rabbit.jumps); // ? (2) null

    delete animal.jumps;

    alert(rabbit.jumps); // ? (3) undefined
}
// 2. Searching algorithm
{
    let head = {
        glasses: 1
    };

    let table = {
        __proto__: head,
        pen: 3
    };

    let bed = {
        __proto__: table,
        sheet: 1,
        pillow: 2
    };

    let pockets = {
        __proto__: bed,
        money: 2000,
    };

    /*
    Calling head.glasses should be faster than pockets.glasses since the property is directly
    defined in the object being called. Calling pockets.glasses will go up each step of the
    prototype chain until finding the property. pockets->bed->table->head

    Subsequent requests will use cached result and the two calls will take same amount of time.
     */
}
// 3. Where does it write?
{
    let animal = {
        eat() {
            this.full = true;
        }
    };

    let rabbit = {
        __proto__: animal
    };

    rabbit.eat();

    /*
    The rabbit recieves the 'full' property.

    No matter where the method is found: in an object or its prototype. 
    In a method call, this is always the object before the dot.
     */
}
// 4. Why are both hamsters full?
{
    let hamster = {
        stomach: [],
        eat(food) {
            this.stomach.push(food);
        }
    };

    let speedy = {
        stomach: [], // Add
        __proto__: hamster
    };

    let lazy = {
        stomach: [], // Add
        __proto__: hamster
    };

    // This one found the food
    speedy.eat("apple");
    alert(speedy.stomach); // apple

    // This one also has it, why? fix please.
    alert(lazy.stomach); // apple

    /*
    Calling lazy.stomach first searches lazy for sto

    Since 'stomach' only exists in hamster, a call to eat() in either speedy or 
    lazy will add to the same stomach in their prototype, hamster.
     */
}