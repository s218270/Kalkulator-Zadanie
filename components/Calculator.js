"use client";
import React, { useEffect, useRef, useState } from "react";

// Helper function to format numbers based on locale
const formatNumber = (number, userLanguage) => {
  const formattedNumber = number.toString();
  if (userLanguage === "pl-PL") {
    return formattedNumber.replace(".", ",");
  }
  return formattedNumber;
};

const Calculator = () => {
  const [calculationState, setCalculationState] = useState({
    firstOperand: [],
    secondOperand: [],
    operator: null,
    result: 0,
  });

  const [display, setDisplay] = useState([0]);
  const [isOperatorUsed, setIsOperatorUsed] = useState(false);
  const [isCommaUsedInFirst, setIsCommaUsedInFirst] = useState(false);
  const [isCommaUsedInSecond, setIsCommaUsedInSecond] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [blockUserInput, setBlockUserInput] = useState(false);
  const [userLanguage, setUserLanguage] = useState("en-US"); // Default to 'en-US'

  const currentOperand = useRef(1);

  const clearAll = () => {
    setCalculationState({
      firstOperand: [],
      secondOperand: [],
      operator: null,
      result: 0,
    });
    setDisplay([0]);
    setIsOperatorUsed(false);
    setIsCommaUsedInFirst(false);
    setIsCommaUsedInSecond(false);
    setHasError(false);
    currentOperand.current = 1;
    setBlockUserInput(false);
  };

  // Function calling respective operand input functions, based on current operand value
  const appendNumber = (number) => {
    const { firstOperand, secondOperand } = calculationState;

    if (hasError) return;
    if (blockUserInput) return;
    if (currentOperand.current === 1 && firstOperand.length < 10) {
      handleFirstOperandInput(number);
    } else if (currentOperand.current === 2 && secondOperand.length < 10) {
      handleSecondOperandInput(number);
    }
  };

  const handleFirstOperandInput = (number) => {
    const { firstOperand } = calculationState;

    // If first number is being added, set display from [0] to []
    if (firstOperand.length < 1) {
      setDisplay([]);
    }

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

          setCalculationState({
            ...calculationState,
            firstOperand: updatedFirstOperand,
          });
          setDisplay(updatedFirstOperand);
        } else {
          updatedFirstOperand.push(number);
          setCalculationState({
            ...calculationState,
            firstOperand: updatedFirstOperand,
          });

          setDisplay((display) => [...display, number]);
        }
      }
    }
    // If number is '.' and wasn't present in first operand yet
    else if (!isCommaUsedInFirst) {
      // If user types '.' as the first number, place 0 before it
      if (firstOperand.length == 0) {
        let updatedFirstOperand = [0];
        updatedFirstOperand.push(number);

        setIsCommaUsedInFirst(true);

        setCalculationState({
          ...calculationState,
          firstOperand: updatedFirstOperand,
        });

        setDisplay((display) => [...display, ...updatedFirstOperand]);
      } else {
        setIsCommaUsedInFirst(true);
        setCalculationState({
          ...calculationState,
          firstOperand: [...firstOperand, number],
        });

        setDisplay((display) => [...display, number]);
      }
    }
  };

  const handleSecondOperandInput = (number) => {
    const { secondOperand } = calculationState;

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

          setCalculationState({
            ...calculationState,
            secondOperand: updatedSecondOperand,
          });
          let newDisplay = [...display];
          newDisplay.pop();

          newDisplay.push(number);

          setDisplay(newDisplay);
        } else {
          setCalculationState({
            ...calculationState,
            secondOperand: [...secondOperand, number],
          });
          setDisplay((display) => [...display, number]);
        }
      }
    }
    // If number is '.' and wasn't present in second operand yet
    else if (!isCommaUsedInSecond) {
      // If user types '.' as the first number, place 0 before it
      if (secondOperand.length == 0) {
        let updatedSecondOperand = [0];
        updatedSecondOperand.push(number);
        setIsCommaUsedInSecond(true);

        setCalculationState({
          ...calculationState,
          secondOperand: updatedSecondOperand,
        });
        setDisplay((display) => [...display, ...updatedSecondOperand]);
      } else {
        setIsCommaUsedInSecond(true);

        setCalculationState({
          ...calculationState,
          secondOperand: [...secondOperand, number],
        });
        setDisplay((display) => [...display, number]);
      }
    }
  };

  const addOperator = (operator) => {
    if (hasError) return;

    const { firstOperand, secondOperand } = calculationState;

    if (!isOperatorUsed) {
      currentOperand.current = 2;
      setCalculationState({
        ...calculationState,
        operator,
      });
      setDisplay((display) => [...display, operator]);

      setIsOperatorUsed(true);
    }
    // If operator was used, but the second operand is not empty - perform operation
    else if (secondOperand.length > 0) {
      performOperation(
        firstOperand,
        secondOperand,
        calculationState.operator,
        (result) => {
          setCalculationState({
            firstOperand: [result],
            secondOperand: [],
            operator,
            result,
          });
          setDisplay([result, operator]);
        }
      );
    }
    // If operator was used, but the second operand is empty - change operator
    else {
      setDisplay((prevDisplay) => [...prevDisplay.slice(0, -1), operator]);
      setCalculationState({
        ...calculationState,
        operator,
      });
      setIsOperatorUsed(true);
    }
  };

  const performOperation = (
    firstOperand,
    secondOperand,
    operator,
    callback = null
  ) => {
    // If first operand is divided by 0 or second operand is empty - return Error
    if (
      (parseFloat(secondOperand.join("")) == 0 && operator == "/") ||
      secondOperand.length < 1
    ) {
      setHasError(true);
      setCalculationState({
        ...calculationState,
        result: "Error",
      });
      return;
    }

    // After operation has concluded, allow second operand to accept '.'
    setIsCommaUsedInSecond(false);

    // After operation has concluded, block user input untill 'c' or operator is pressed
    setBlockUserInput(true);

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
    setCalculationState({
      ...calculationState,
      result: result,
    });
    if (callback) {
      setBlockUserInput(false);
      callback(result);
    }
  };

  // Checking if display or result has not too many numbers
  useEffect(() => {
    let entireDisplay = display.join("");
    if (entireDisplay.length > 22) {
      setHasError(true);
      setDisplay(["Error"]);
      setCalculationState({
        ...calculationState,
        result: "Error",
      });
    }
    if (calculationState.result.length > 25) {
      setHasError(true);
    }
  }, [display, calculationState.result]);

  // Set up keypress event listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // Check if the pressed key is a number between 1-9
      if (key >= "0" && key <= "9") {
        appendNumber(Number(key)); // Call appendNumber with the pressed key as a number
      }
      if (userLanguage == "pl-PL" && key == ",") {
        appendNumber(".");
      }
      if (userLanguage != "pl-PL" && key == ".") {
        appendNumber(".");
      }
      if (key == "/" || key == "*" || key == "+" || key == "-") {
        addOperator(key);
      }
      if (key == "c" || key == "C") {
        clearAll();
      }
      if (key == "=" || key == "Enter") {
        performOperation(
          calculationState.firstOperand,
          calculationState.secondOperand,
          calculationState.operator
        );
      }
    };

    // Add the event listener for 'keydown'
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    calculationState.firstOperand,
    calculationState.secondOperand,
    calculationState.operator,
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
          {display.map((item) => formatNumber(item, userLanguage)).join("")}
        </p>
        <p className="w-4/5 h-1/3 border-black border-2 text-right">
          {formatNumber(calculationState.result, userLanguage)}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full h-4/5 p-2">
        <button
          className="border-black border-2"
          onClick={() => {
            clearAll();
          }}
        >
          C
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            addOperator("/");
          }}
        >
          /
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            addOperator("*");
          }}
        >
          *
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            addOperator("-");
          }}
        >
          -
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(7);
          }}
        >
          7
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(8);
          }}
        >
          8
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(9);
          }}
        >
          9
        </button>
        <button
          className="border-black border-2 row-span-2"
          onClick={() => {
            addOperator("+");
          }}
        >
          +
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(4);
          }}
        >
          4
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(5);
          }}
        >
          5
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(6);
          }}
        >
          6
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(1);
          }}
        >
          1
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(2);
          }}
        >
          2
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(3);
          }}
        >
          3
        </button>
        <button
          className="border-black border-2 row-span-2"
          onClick={() => {
            performOperation(
              calculationState.firstOperand,
              calculationState.secondOperand,
              calculationState.operator
            );
          }}
        >
          =
        </button>
        <button
          className="border-black border-2 col-span-2"
          onClick={() => {
            appendNumber(0);
          }}
        >
          0
        </button>
        <button
          className="border-black border-2"
          onClick={() => {
            appendNumber(".");
          }}
        >
          {formatNumber(".", userLanguage)}
        </button>
      </div>
    </div>
  );
};

export default Calculator;
