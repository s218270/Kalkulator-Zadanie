"use client";

import {
  setResult,
  setHasError,
  setBlockUserInput,
  setIsCommaUsedInSecond,
  setDisplay,
} from "../redux/features/calculatorSlice";

export const performOperation = (
  firstOperand,
  secondOperand,
  operator,
  display,
  dispatch,
  callback = null
) => {
  // If second operand is empty - return
  if (secondOperand.length < 1) {
    return;
  }

  // If second operand has "." at the end - pop it
  if (secondOperand[secondOperand.length - 1] == ".") {
    let newDisplay = [...display];
    newDisplay.pop();
    dispatch(setDisplay(newDisplay));
  }

  // If first operand is divided by 0 - return Error
  if (parseFloat(secondOperand.join("")) == 0 && operator == "/") {
    dispatch(setHasError(true));
    dispatch(setResult("Division by 0"));
    return;
  }

  // if first operand is empty - make first operand [0]
  if (firstOperand.length == 0) {
    firstOperand = [0];
  }

  // After operation has concluded, allow second operand to accept '.'
  dispatch(setIsCommaUsedInSecond(false));

  // After operation has concluded, block user input untill 'c' or operator is pressed
  dispatch(setBlockUserInput(true));

  const num1 = parseFloat(firstOperand.join(""));
  const num2 = parseFloat(secondOperand.join(""));
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      return;
  }
  // Rounding final result to avoid floating point errors
  result = Math.round(result * 100000000) / 100000000;
  dispatch(setResult(result));
  if (callback) {
    dispatch(setBlockUserInput(false));
    callback(result);
  }
};
