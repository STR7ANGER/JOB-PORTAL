import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CompanyState {
  company: any;
}

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
  } as CompanyState,
  reducers: {
    setCompany: (state, action: PayloadAction<any>) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;

