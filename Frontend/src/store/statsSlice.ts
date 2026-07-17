import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userData } from "../types";

type StatsState = {
  stats: userData[];
};
const initialState: StatsState = {
  stats: [],
};

const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    setStats: (state, action: PayloadAction<userData[]>) => {
      state.stats = action.payload;
    },
  },
});

export const { setStats } = statsSlice.actions;
export default statsSlice.reducer;
