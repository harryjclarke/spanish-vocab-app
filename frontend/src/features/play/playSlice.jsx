import { createSlice } from "@reduxjs/toolkit";

const playSlice = createSlice({
  name: "play",
  initialState: { options: null },
  reducers: {
    setInPlayVerbs: (state, action) => {
      if (action.payload.options) state.options = action.payload.options;
      if (action.payload.inPlay) state.inPlay = action.payload.inPlay;
    },
    clearInPlayVerbs: (state, action) => {
      state.options = null;
    },
    setUserAnswer: (state, action) => {
      if (action.payload.userAnswer) {
        if (!state.userAnswer) {
          state.userAnswer = [action.payload.userAnswer];
        } else {
          state.userAnswer.push(action.payload.userAnswer);
        }
      }
    },
    clearUserAnswers: (state, action) => {
      state.userAnswer = null;
    },
  },
});

export const {
  setInPlayVerbs,
  clearInPlayVerbs,
  setUserAnswer,
  clearUserAnswers,
} = playSlice.actions;

export default playSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
export const selectAllOptions = (state) => state.play.options;
export const selectAllInPlay = (state) => state.play.inPlay;
export const selectAllUserAnswers = (state) => state.play.userAnswer;
