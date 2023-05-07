import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentLoc:"tr",
}

export const LocalizationSlice=createSlice({
    name:'Localization',
    initialState,
    reducers:{
        ChangeLanguage:(state,action)=>{
            state.currentLoc=action.payload
        },
    }
})

export const {ChangeLanguage}=LocalizationSlice.actions

export default LocalizationSlice.reducer