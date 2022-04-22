<h1 align="center">Calculator</h1>

<p align="center">
    <a href="https://toddbrentlinger.github.io/odin-project/foundations/javascript-basics/project-calculator/">
        <img src="https://toddbrentlinger.github.io/odin-project/foundations/javascript-basics/project-calculator/favicon/android-chrome-192x192.png" width="25%" alt="Calculator icon."/>
        <div align="center">Click to see it in action!</div>
    </a>
</p>

## Overview

The design of this calculator's functionality and style is based on the calculator app found on an iPhone. It was initially a project in the JavaScript Basics section of the Odin Project.

## Features

- Basic math operations: add, subtract, multiply, divide

- Use decimal numbers in calculations

- Clear calculation and restart with a button press

- Displays limited number of digits to the screen and removes any trailing zeros

> To deal with floating number arithmetic issues (ex. `0.1 + 0.2 = 0.30000000000000004`), the number displayed
has the number of digits limited (ex. 12 digits) and then any trailing zeros for decimal numbers are removed
to ultimately display `0.1 + 0.2 = 0.3`. The original number itself is unchanged and used for the next operation.

- Handles dividing by zero

> When the user tries to divide by zero, the output displays `ERROR`. The calculator then expects a new number from the user to divide by instead of zero to continue the previous calculation.

- Keyboard functionality

> Can use keyboard to enter numbers and operators. Equal button on calculator can be clicked with either <kbd>=</kbd> or <kbd>Enter</kbd> key.

## TO-DO List

1. Add 'backspace' functionality to undo the last number input.
1. Add plus/minus button to change the sign of the current number (multiply by -1)
1. Add percentage button (divides by 100)

- - -
<p align="center">© 2022 Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.</p>