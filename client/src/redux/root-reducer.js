import { combineReducers } from "redux";
import userReducer from './user/user.reducer';
import {persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import areaReducer from "./area/area.reducer";

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user']
};

const rootReducer = combineReducers ({
    user: userReducer,
    area: areaReducer
});

export default persistReducer(persistConfig, rootReducer);