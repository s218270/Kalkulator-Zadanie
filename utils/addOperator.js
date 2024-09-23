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
  dispatch
) => {
  if (hasError) return;

  if (!isOperatorUsed) {
    dispatch(setCurrentOperand(2));
    dispatch(setOperator(operator));
    dispatch(setDisplay([...display, operator]));
    dispatch(setIsOperatorUsed(true));
  }

  // If operator was used, but the second operand is not empty - perform operation
  else if (secondOperand.length > 0) {
    performOperation(
      firstOperand,
      secondOperand,
      operator,
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
