"use client";

import {
  setCurrentOperand,
  setDisplay,
  setOperator,
  setIsOperatorUsed,
  setFirstOperand,
  setSecondOperand,
  setResult,
} from "../redux/features/calculatorSlice";
import { performOperation } from "../utils/performOperation";

export const addOperator = (
  operator,
  hasError,
  firstOperand,
  secondOperand,
  isOperatorUsed,
  display,
  calculatorState,
  dispatch
) => {
  if (hasError) return;

  if (!isOperatorUsed) {
    // If first operand has "." at the end - pop it
    if (firstOperand[firstOperand.length - 1] == ".") {
      let newDisplay = [...display];
      newDisplay.pop();
      dispatch(setDisplay([...newDisplay, operator]));
    } else {
      dispatch(setDisplay([...display, operator]));
    }
    dispatch(setCurrentOperand(2));
    dispatch(setOperator(operator));
    dispatch(setIsOperatorUsed(true));
  }

  // If operator was used, but the second operand is not empty - perform operation
  else if (secondOperand.length > 0) {
    performOperation(
      firstOperand,
      secondOperand,
      calculatorState.operator,
      display,
      dispatch,
      (result) => {
        dispatch(setFirstOperand([result]));
        dispatch(setSecondOperand([]));
        dispatch(setOperator(operator));
        dispatch(setResult(result));
        dispatch(setDisplay([result, operator]));
      }
    );
  }

  // If operator was used, but the second operand is empty - change operator
  else {
    dispatch(setDisplay([...display.slice(0, -1), operator]));
    dispatch(setOperator(operator));
    dispatch(setIsOperatorUsed(true));
  }
};
