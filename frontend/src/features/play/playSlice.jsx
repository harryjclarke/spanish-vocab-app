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
  },
});

export const { setInPlayVerbs, clearInPlayVerbs } = playSlice.actions;

export default playSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;
export const selectAllOptions = (state) => state.play.options;
export const selectAllInPlay = (state) => state.play.inPlay;
