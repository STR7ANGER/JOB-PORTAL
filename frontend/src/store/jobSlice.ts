import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/types/job";

interface JobState {
  allJobs: Job[];
  singleJob: Job | null;
}

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
  } as JobState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action: PayloadAction<Job | null>) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;