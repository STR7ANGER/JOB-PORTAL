import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Application } from "@/types/application";

interface ApplicationState {
  appliedJobs: Application[];
}

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    appliedJobs: [],
  } as ApplicationState,
  reducers: {
    setAppliedJobs: (state, action: PayloadAction<Application[]>) => {
      state.appliedJobs = action.payload;
    },
  },
});

export const { setAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;

