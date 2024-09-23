"use client";
import { formatNumber } from "@/utils/formatNumber";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendNumber } from "../utils/appendNumber";
import { addOperator } from "../utils/addOperator";
import { performOperation } from "../utils/performOperation";
import { clearAll } from "../utils/clearAll";
import {
  setHasError,
  setDisplay,
  setResult,
} from "../redux/features/calculatorSlice";

const Calculator = () => {
  const dispatch = useDispatch();
  const calculatorState = useSelector((state) => state.calculator);

  const [userLanguage, setUserLanguage] = useState("en-US"); // Default to 'en-US'

  const handleNumberClick = (number) => {
    appendNumber(
      number,
      calculatorState.hasError,
      calculatorState.blockUserInput,
      calculatorState.currentOperand,
      calculatorState.firstOperand,
      calculatorState.secondOperand,
      calculatorState.isCommaUsedInFirst,
      calculatorState.isCommaUsedInSecond,
      calculatorState.display,
      dispatch
    );
  };

  const handleOperatorClick = (operator) => {
    addOperator(
      operator,
      calculatorState.hasError,
      calculatorState.firstOperand,
      calculatorState.secondOperand,
      calculatorState.isOperatorUsed,
      calculatorState.display,
      dispatch
    );
  };

  const handleEqualClick = () => {
    performOperation(
      calculatorState.firstOperand,
      calculatorState.secondOperand,
      calculatorState.operator,
      dispatch
    );
  };

  // Checking if display or result has not too many numbers
  useEffect(() => {
    let entireDisplay = calculatorState.display.join("");
    if (entireDisplay.length > 22) {
      dispatch(setHasError(true));
      dispatch(setDisplay(["Error"]));
      dispatch(setResult("Error"));
    }
    if (calculatorState.result.length > 25) {
      dispatch(setHasError(true));
    }
  }, [calculatorState.display, calculatorState.result]);

  // Set up keypress event listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // Check if the pressed key is a number between 1-9
      if (key >= "0" && key <= "9") {
        handleNumberClick(Number(key)); // Call appendNumber with the pressed key as a number
      }
      if (userLanguage == "pl-PL" && key == ",") {
        handleNumberClick(".");
      }
      if (userLanguage != "pl-PL" && key == ".") {
        handleNumberClick(".");
      }
      if (key == "/" || key == "*" || key == "+" || key == "-") {
        handleOperatorClick(key);
      }
      if (key == "c" || key == "C") {
        clearAll(dispatch);
      }
      if (key == "=" || key == "Enter") {
        handleEqualClick();
      }
    };

    // Add the event listener for 'keydown'
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    calculatorState.firstOperand,
    calculatorState.secondOperand,
    calculatorState.operator,
  ]);

  // Ensure navigator is accessed on client-side only
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setUserLanguage(navigator.language || "en-US");
    }
  }, []);

  return (
    <div className="w-[300px] h-[500px] flex flex-col border-black border-2">
      <div className="w-full h-1/5 flex flex-col items-center gap-3 pt-2">
        <p className="w-4/5 h-1/3 border-black border-2 text-right">
          {calculatorState.display
            .map((item) => formatNumber(item, userLanguage))
            .join("")}
        </p>
        <p className="w-4/5 h-1/3 border-black border-2 text-right">
          {formatNumber(calculatorState.result, userLanguage)}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full h-4/5 p-2">
        <button
          className="border-black border-2"
          onClick={() => {
            clearAll(dispatch);
          }}
        >
          C
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleOperatorClick("/");
          }}
        >
          /
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleOperatorClick("*");
          }}
        >
          *
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleOperatorClick("-");
          }}
        >
          -
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(7);
          }}
        >
          7
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(8);
          }}
        >
          8
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(9);
          }}
        >
          9
        </button>
        <button
          className="border-black border-2 row-span-2"
          onClick={() => {
            handleOperatorClick("+");
          }}
        >
          +
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(4);
          }}
        >
          4
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(5);
          }}
        >
          5
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(6);
          }}
        >
          6
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(1);
          }}
        >
          1
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(2);
          }}
        >
          2
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(3);
          }}
        >
          3
        </button>
        <button
          className="border-black border-2 row-span-2"
          onClick={() => {
            handleEqualClick();
          }}
        >
          =
        </button>
        <button
          className="border-black border-2 col-span-2"
          onClick={() => {
            handleNumberClick(0);
          }}
        >
          0
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            handleNumberClick(".");
          }}
        >
          {formatNumber(".", userLanguage)}
        </button>
      </div>
    </div>
  );
};

export default Calculator;
