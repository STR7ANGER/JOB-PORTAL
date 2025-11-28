import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface JobState {
  allJobs: any[];
  singleJob: any;
}

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
  } as JobState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<any[]>) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action: PayloadAction<any>) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;