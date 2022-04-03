'use strict';

function init() {
    const container = document.getElementById('container');
    let tempElement;

    // 1
    tempElement = document.createElement('p');
    tempElement.textContent = 'Hey I\'m red!';
    tempElement.style.color = 'red';
    container.appendChild(tempElement);

    // 2
    tempElement = document.createElement('h3');
    tempElement.textContent = 'I\'m a blue h3!';
    tempElement.style.color = 'blue';
    container.appendChild(tempElement);

    // 3
    const divElement = document.createElement('div');
    divElement.style.border = '2px solid black';
    divElement.style.backgroundColor = 'pink';

    tempElement = document.createElement('h1');
    tempElement.textContent = 'I\'m in a div';
    divElement.appendChild(tempElement);

    tempElement = document.createElement('p');
    tempElement.textContent = 'ME TOO!';
    divElement.appendChild(tempElement);

    container.appendChild(divElement);
}

init();