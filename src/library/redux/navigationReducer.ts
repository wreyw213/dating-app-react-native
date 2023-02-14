import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ScreenConstants from "../constants/ScreenConstants";

type Payload = {
    key?: string,
    name: string,
    params?: any
}


interface initialState {
    data: Payload
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        data: {
            name: ScreenConstants.HOME_SCREEN
        },
    },
    reducers: {
        updateNavigationState(state: initialState, action: PayloadAction<Payload>) {
            state.data = action.payload
        }
    },
})

export const {updateNavigationState} = navigationSlice.actions;

export default navigationSlice.reducer