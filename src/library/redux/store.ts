import { configureStore } from '@reduxjs/toolkit';
import appReducer from './themeReducer';
import homeSlice from './homeReducer';
import navigationReducer from './navigationReducer';
import messageReducer from './reducer';
import addReducer from './addReducer';

export const store = configureStore({
    reducer: {
        message: messageReducer,
        homeSlice: homeSlice,
        currentNavigationState: navigationReducer,
        appData: appReducer,
        addMobData:addReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
