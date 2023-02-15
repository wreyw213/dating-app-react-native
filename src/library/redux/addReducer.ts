import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialState {
    count:number,
    addShowing:boolean,
    addLoaded:boolean
}
const addSlice = createSlice({
    name: 'addMob',
    initialState: {
        count:0,
        addShowing:false,
        addLoaded:false
    },
    reducers: {
        updateAddState(state: initialState, action: PayloadAction<boolean>) {
            state.addShowing = action.payload

            if (state.addShowing) state.count = 0;
            else state.count += 1;
        },
        updateLoadedState(state: initialState, action: PayloadAction<boolean>) {
            state.addLoaded = action.payload
        },

    },
})

export const { updateAddState,updateLoadedState } = addSlice.actions;

export default addSlice.reducer