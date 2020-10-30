// Creating a page where every time the user hits the "Roll Dice" button, the screen randomly updates the two dice.
// Use the HTML & CSS included in the starter code folder to get started. Do NOT modify the HTML or CSS.

// 1) Write the following program:
// * Generate a random number between 1 - 6 inclusive and store to a variable, randomOne
//     * Hint: Look at the Math.random() documentation on MDN for a function that does this
// * Generate a random number between 1 - 6 inclusive and store to a variable, randomTwo
// * Combine 'dice-' and randomOne to form the random class for the first die, `firstDie`
//     * Hint: Take a look at the class set, in index.html, on the elements for the dice
//     * Hint: Take a look at the CSS rules that have .dice-1, .dice-2, etc as their selector
// * Combine 'dice-' and randomTwo to form the random class for the second die, `secondDie`
// * Get the first die by id and update its class to `firstDie`
//     * Hint: document.getElementById to get the die by id
//     * Hint: Use the className property once you have the die, and set it equal to `firstDie`
// * Get the second die by id and update its class to `secondDie`

// 2) Listen for clicks on the `Roll the Dice` button. On click, run the code to
// update the dice on the page using the code from the first part.
//     * Hint: You'll want to wrap the code from the first part in a function.
//     * Hint: What method can you use to select the `Roll the Dice` button based on its id?
//     * Hint: You'll need to use onclick to listen for clicks on the button

function diceRoll() {

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }

  let randomOne = getRandomNum(1,6);
  let randomTwo = getRandomNum(1,6);

  let firstDie = "dice-" + randomOne;
  let secondDie = "dice-" + randomTwo;

  document.getElementById('first-die').className = firstDie;
  document.getElementById('second-die').className = secondDie;

  console.log("new 1st die", firstDie);
  console.log("new 2nd die", secondDie);

  // Template Literals in ES6
  // let firstDie = `dice-${randomOne}`;
  // let secondDie = `dice-${randomTwo}`;

  // let first = document.getElementById('first-die').className;
  // let second = document.getElementById('second-die').className;

  // console.log("before 1st change", first);
  // console.log("before 2nd change", second);
}
let button = document.getElementById('roll-dice');
button.addEventListener("click", diceRoll );
