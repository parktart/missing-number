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

/* MAKE ARRAY */
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
  appendArray(theArray);
}

/* APPEND ARRAY */
function appendArray(theArray) {
  const delayInterval = 50; // stagger each append by 50 milliseconds
  for (let i = 0; i < theArray.length; i++) {
    doSetTimeout(i, theArray, delayInterval);
  }
  const delayTotal = delayInterval * (theArray.length - 1);
  // delay next step until array has fully appeared + 500ms
  setTimeout(displayRandomContainer, delayTotal + 500);
}

function doSetTimeout(i, theArray, delayInterval) {
  setTimeout(function() {
    const arrayDiv = document.createElement('div');
    arrayDiv.innerText = theArray[i];
    div_arrayContainer.appendChild(arrayDiv);
  }, i * delayInterval);
}

/* REMOVE NUMBER */
function displayRandomContainer() {
  div_randomContainer.style.display = 'flex';
}

button_go.addEventListener('click', removeNumber);

function removeNumber() {
  const randomNum = Math.floor(Math.random()*theArray.length) + 1;
  const indexValue = randomNum - 1;
  theArray.splice(indexValue, 1);
  const div_numToRemove = document.querySelector(`.array-container.wrap div:nth-child(${randomNum})`);
  div_numToRemove.style.display = 'none';
  button_go.removeEventListener('click', removeNumber);
  setTimeout(displayExplainContainer, 500); // delay by 500ms
  console.log(`The final array is: ${theArray}`);
}

function displayExplainContainer() {
  div_explainContainer.style.display = 'flex';
}

// Now use logic to identify which number was removed.
// The constraint is you are only given the edited array,
// which has a number missing.

button_continue.addEventListener('click', getMissingNum);

/* FIND MISSING NUMBER */
function getMissingNum() {
  const finalArrayLength = theArray.length;
  const finalArraySum = theArray.reduce((accumulator, element_i) => accumulator + element_i, 0);
  // the return value of the callback function is passed back into the callback function's param1
  // along with the next element in the array
  // initial value passed to param1 is 0
  
  const initialArrayLength = finalArrayLength + 1;
  const initialArraySum = initialArrayLength * (initialArrayLength + 1) / 2;
  // the sum of every integer up to a specified number is called the "sum of natural numbers"
  // and is equal to n(n+1)/2
  
  const missingNum = initialArraySum - finalArraySum;
  console.log(`The missing number is: ${missingNum}`);
  displayMissingContainer(missingNum);
  button_continue.removeEventListener('click', getMissingNum);
}

/* ALERT MISSING NUMBER */
function displayMissingContainer(missingNum) {
  div_missingContainer.style.display = 'flex';

  const resultP = document.createElement('p');
  resultP.innerText = `The missing number was: ${missingNum}`;
  div_missingContainer.appendChild(resultP);
  
  setTimeout(displayMissingNum, 1000, missingNum)
}

/* DISPLAY MISSING NUMBER */
function displayMissingNum(missingNum) {
  const div_numToDisplay = document.querySelector(`.array-container.wrap div:nth-child(${missingNum})`);
  div_numToDisplay.style.display = 'block';
  div_numToDisplay.style.color = 'red';
}