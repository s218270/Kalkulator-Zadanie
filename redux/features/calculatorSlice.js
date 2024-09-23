import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstOperand: [],
  secondOperand: [],
  currentOperand: 1,
  operator: null,
  result: 0,
  display: [0],
  isOperatorUsed: false,
  isCommaUsedInFirst: false,
  isCommaUsedInSecond: false,
  hasError: false,
  blockUserInput: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setFirstOperand: (state, action) => {
      state.firstOperand = action.payload;
    },
    setSecondOperand: (state, action) => {
      state.secondOperand = action.payload;
    },
    setCurrentOperand: (state, action) => {
      state.currentOperand = action.payload;
    },
    setOperator: (state, action) => {
      state.operator = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    setIsCommaUsedInFirst: (state, action) => {
      state.isCommaUsedInFirst = action.payload;
    },
    setIsCommaUsedInSecond: (state, action) => {
      state.isCommaUsedInSecond = action.payload;
    },
    setIsOperatorUsed: (state, action) => {
      state.isOperatorUsed = action.payload;
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setBlockUserInput: (state, action) => {
      state.blockUserInput = action.payload;
    },
    clearState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setFirstOperand,
  setSecondOperand,
  setCurrentOperand,
  setOperator,
  setResult,
  setDisplay,
  setIsOperatorUsed,
  setIsCommaUsedInFirst,
  setIsCommaUsedInSecond,
  setHasError,
  setBlockUserInput,
  clearState,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
