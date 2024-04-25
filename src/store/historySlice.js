import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addSearchToHistory(state, action) {
      state.history.push(action.payload);
    },
  },
});

export const { addSearchToHistory } = historySlice.actions;
export default historySlice.reducer;
