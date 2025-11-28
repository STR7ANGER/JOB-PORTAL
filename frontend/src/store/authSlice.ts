import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface AuthState {
    loading: boolean;
    user: User | null;
}

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    } as AuthState,
    reducers:{
        setLoading:(state, action: PayloadAction<boolean>)=>{
            state.loading = action.payload;
        },
        setUser:(state, action: PayloadAction<User | null>)=>{
            state.user = action.payload;
        }
    }
})

export const { setLoading,setUser } = authSlice.actions;
export default authSlice.reducer;