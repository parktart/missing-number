"use strict";

const input_arrayLength = document.querySelector('.array-length input');
const button_makeArray = document.querySelector('#make-array');
const div_arrayContainer = document.querySelector('.array-container.wrap');
const div_randomContainer = document.querySelector('.random-button.wrap');
const button_go = document.querySelector('.random-button button');
const div_explainContainer = document.querySelector('.explain-container.wrap');
const button_continue = document.querySelector('#continue');
const div_calcsContainer = document.querySelector('.calcs-container.wrap');
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
  setTimeout(() => div_randomContainer.style.display = 'none', 500);
  setTimeout(displayExplainContainer, 1000);
  console.log(`The final array is: ${theArray}`);
}

function displayExplainContainer() {
  div_explainContainer.style.display = 'flex';
}

// Now use logic to identify which number was removed.
// The constraint is you are only given the edited array,
// which has a number missing.

button_continue.addEventListener('click', hideExplainContainer);

function hideExplainContainer() {
  div_explainContainer.classList.add('full-height');
  setTimeout(() => div_explainContainer.classList.add('zero-height'), 1);
  setTimeout(getMissingNum, 1000); // delay by 1s
}

/* FIND MISSING NUMBER */
let missingNum;

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
  
  missingNum = initialArraySum - finalArraySum;
  console.log(`The missing number is: ${missingNum}`);
  displayCalcs(finalArrayLength, finalArraySum, initialArrayLength, initialArraySum, missingNum);
}

function displayCalcs(finalArrayLength, finalArraySum, initialArrayLength, initialArraySum, missingNum) {

  let accum = 0;
  let delayIntrvl = 2000; // milliseconds

  const p1 = document.createElement('p');
  p1.innerText = `The above array contains ${finalArrayLength} elements.`;
  setTimeout(() => div_calcsContainer.appendChild(p1), accum);
  setTimeout(() => p1.classList.add('full-opac'), accum + 50);
  
  const p2 = document.createElement('p');
  p2.innerText = `The sum of those elements is ${finalArraySum}.`;
  setTimeout(() => div_calcsContainer.appendChild(p2), accum += delayIntrvl);
  setTimeout(() => p2.classList.add('full-opac'), accum + 50);

  const p3 = document.createElement('p');
  p3.innerText = `The original array contained ${finalArrayLength} + 1 = ${finalArrayLength+1} elements.`;
  setTimeout(() => div_calcsContainer.appendChild(p3), accum += delayIntrvl);
  setTimeout(() => p3.classList.add('full-opac'), accum + 50);

  const p4 = document.createElement('p');
  p4.innerText = `The sum of all elements in the original array is equal to the "sum of natural numbers".`;
  setTimeout(() => div_calcsContainer.appendChild(p4), accum += delayIntrvl);
  setTimeout(() => p4.classList.add('full-opac'), accum + 50);

  const p5 = document.createElement('p');
  p5.innerText = `Which is the sum of every positive integer up to and including a specified number.`;
  setTimeout(() => div_calcsContainer.appendChild(p5), accum += delayIntrvl);
  setTimeout(() => p5.classList.add('full-opac'), accum + 50);

  const p6 = document.createElement('p');
  p6.innerText = `n(n+1)/2`;
  setTimeout(() => div_calcsContainer.appendChild(p6), accum += delayIntrvl);
  setTimeout(() => p6.classList.add('full-opac'), accum + 50);

  const p7 = document.createElement('p');
  p7.innerText = `The sum of all elements in the original array was therefore ${initialArraySum}.`;
  setTimeout(() => div_calcsContainer.appendChild(p7), accum += delayIntrvl);
  setTimeout(() => p7.classList.add('full-opac'), accum + 50);

  const p8 = document.createElement('p');
  p8.innerText = `The difference = ${initialArraySum} - ${finalArraySum} = ${initialArraySum - finalArraySum}.`;
  setTimeout(() => div_calcsContainer.appendChild(p8), accum += delayIntrvl);
  setTimeout(() => p8.classList.add('full-opac'), accum + 50);

  const button_continue2 = document.createElement('button');
  button_continue2.innerText = `CONTINUE`;
  setTimeout(() => div_calcsContainer.appendChild(button_continue2), accum += delayIntrvl);
  setTimeout(() => button_continue2.classList.add('full-opac'), accum + 50);
  button_continue2.addEventListener('click', hideCalcsContainer);
}

function hideCalcsContainer() {
  div_calcsContainer.classList.add('full-height');
  setTimeout(() => div_calcsContainer.classList.add('zero-height'), 1);
  setTimeout(displayMissingContainer, 1000, missingNum); // delay by 1s
}

/* ALERT MISSING NUMBER */
function displayMissingContainer(missingNum) {
  div_missingContainer.style.display = 'flex';

  const resultP = document.createElement('p');
  resultP.innerText = `The missing number was: ${missingNum}`;
  div_missingContainer.appendChild(resultP);
  
  setTimeout(displayMissingNum, 1200, missingNum)
}

/* DISPLAY MISSING NUMBER */
function displayMissingNum(missingNum) {
  const div_numToDisplay = document.querySelector(`.array-container.wrap div:nth-child(${missingNum})`);
  div_numToDisplay.style.display = 'block';
  div_numToDisplay.style.color = 'red';
}