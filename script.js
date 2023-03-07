"use strict";

const input_arrayLength = document.querySelector('.array-length input');
const button_makeArray = document.querySelector('#make-array');
const div_arrayContainer = document.querySelector('.array-container.wrap');
const div_randomContainer = document.querySelector('.random-button.wrap');
const button_go = document.querySelector('.random-button button');
const div_explainContainer = document.querySelector('.explain-container.wrap');
const button_continue = document.querySelector('#continue');
const div_missingContainer = document.querySelector('.missing-container.wrap');

let theArray = [];
let arrayLength;

/* MAKE ARRAY - make array of user-inputed length */
button_makeArray.addEventListener('click', checkInput);

function checkInput() {
  arrayLength = +input_arrayLength.value;
  if (arrayLength < 1 || arrayLength > 100) return;
  makeArray(arrayLength);
}

function makeArray(arrayLength) {
  button_makeArray.removeEventListener('click', checkInput);
  for (let i = 1; i <= arrayLength; i++) {
    theArray.push(i);
  };
  console.log(`The initial array is: ${theArray}`);
}

/* APPEND ARRAY - append and display in array container */

/* REMOVE NUMBER - remove a random element - remove from the displayed array */


// Now use logic to identify which number was removed.
// The constraint is you are only given the edited array,
// which has a number missing.


// FIND MISSING NUMBER


// ALERT MISSING NUMBER


// DISPLAY MISSING NUMBER