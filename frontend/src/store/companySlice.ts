import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Company } from "@/types/company";

interface CompanyState {
  company: Company | null;
}

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
  } as CompanyState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company | null>) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;

