'use strict';

const body = document.querySelector('body');
const para = document.createElement('p');
body.appendChild(para);

function handleOnMouseMove(e) {
    let hue = Math.max(Math.min((e.clientX / body.clientWidth) * 360, 360), 0);
    
    body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    para.textContent = `clientX: ${e.clientX}\nclientWidth: ${body.clientWidth}`;
}

document.addEventListener('DOMContentLoaded', () => {
    body.addEventListener('mousemove', handleOnMouseMove, true);
});