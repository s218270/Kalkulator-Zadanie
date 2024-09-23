"use client";

import {
  setFirstOperand,
  setIsCommaUsedInFirst,
  setIsCommaUsedInSecond,
  setSecondOperand,
  setDisplay,
} from "../redux/features/calculatorSlice";

// Function calling respective operand input functions, based on current operand value
export const appendNumber = (
  number,
  hasError,
  blockUserInput,
  currentOperand,
  firstOperand,
  secondOperand,
  isCommaUsedInFirst,
  isCommaUsedInSecond,
  display,
  dispatch
) => {
  if (hasError) return;
  if (blockUserInput) return;
  if (currentOperand === 1 && firstOperand.length < 10) {
    handleFirstOperandInput(
      number,
      firstOperand,
      isCommaUsedInFirst,
      display,
      dispatch
    );
  } else if (currentOperand === 2 && secondOperand.length < 10) {
    handleSecondOperandInput(
      number,
      secondOperand,
      isCommaUsedInSecond,
      display,
      dispatch
    );
  }
};

const handleFirstOperandInput = (
  number,
  firstOperand,
  isCommaUsedInFirst,
  display,
  dispatch
) => {
  if (number !== ".") {
    // Checking if first operand is not 0 or if it is, but after '.' (to not push many 0's to first operand like 00002)
    if (
      number != 0 ||
      (number == 0 && firstOperand[0] !== 0) ||
      (number == 0 && firstOperand[0] === 0 && firstOperand[1] == ".")
    ) {
      let updatedFirstOperand = [...firstOperand];
      // Checking if first operand has 0's at the start and is not a float, then removing them
      if (number != 0 && firstOperand[0] === 0 && firstOperand[1] !== ".") {
        updatedFirstOperand.shift();
        updatedFirstOperand.push(number);
        dispatch(setFirstOperand(updatedFirstOperand));
        dispatch(setDisplay(updatedFirstOperand));
      } else {
        updatedFirstOperand.push(number);
        dispatch(setFirstOperand(updatedFirstOperand));
        // If first number is being added, set display from [0] to []
        if (firstOperand.length == 0) {
          dispatch(setDisplay([number]));
        } else {
          dispatch(setDisplay([...display, number]));
        }
      }
    }
  }
  // If number is '.' and wasn't present in first operand yet
  else if (!isCommaUsedInFirst) {
    // If user types '.' as the first number, place 0 before it
    if (firstOperand.length == 0) {
      let updatedFirstOperand = [0];
      updatedFirstOperand.push(number);
      dispatch(setIsCommaUsedInFirst(true));
      dispatch(setFirstOperand(updatedFirstOperand));
      dispatch(setDisplay([...updatedFirstOperand]));
    } else {
      dispatch(setIsCommaUsedInFirst(true));
      dispatch(setFirstOperand([...firstOperand, number]));
      dispatch(setDisplay([...display, number]));
    }
  }
};

const handleSecondOperandInput = (
  number,
  secondOperand,
  isCommaUsedInSecond,
  display,
  dispatch
) => {
  if (number !== ".") {
    // Checking if second operand is not 0 or if it is, but after '.' (to not push many 0's to second operand like 00002)
    if (
      number != 0 ||
      (number == 0 && secondOperand[0] !== 0) ||
      (number == 0 && secondOperand[0] === 0 && secondOperand[1] == ".")
    ) {
      let updatedSecondOperand = [...secondOperand];
      // Checking if second operand has 0's at the start and is not a float, then removing them
      if (number != 0 && secondOperand[0] === 0 && secondOperand[1] !== ".") {
        updatedSecondOperand.shift();
        updatedSecondOperand.push(number);
        dispatch(setSecondOperand(updatedSecondOperand));
        let newDisplay = [...display];
        newDisplay.pop();
        newDisplay.push(number);
        dispatch(setDisplay(newDisplay));
      } else {
        dispatch(setSecondOperand([...secondOperand, number]));
        dispatch(setDisplay([...display, number]));
      }
    }
  }
  // If number is '.' and wasn't present in second operand yet
  else if (!isCommaUsedInSecond) {
    // If user types '.' as the first number, place 0 before it
    if (secondOperand.length == 0) {
      let updatedSecondOperand = [0];
      updatedSecondOperand.push(number);
      dispatch(setIsCommaUsedInSecond(true));
      dispatch(setSecondOperand(updatedSecondOperand));
      dispatch(setDisplay([...display, ...updatedSecondOperand]));
    } else {
      dispatch(setIsCommaUsedInSecond(true));
      dispatch(setSecondOperand([...secondOperand, number]));
      dispatch(setDisplay([...display, number]));
    }
  }
};
