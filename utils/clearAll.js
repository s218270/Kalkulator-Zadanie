import { clearState } from "../redux/features/calculatorSlice";

export const clearAll = (dispatch) => {
  dispatch(clearState());
};
