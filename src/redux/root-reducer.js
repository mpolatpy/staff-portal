import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import teachersReducer from './teachers/teachers.reducer';
import observationFormReducer from './observation-form/oservation-form.reducer';

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    teachers: teachersReducer,
    observationForm: observationFormReducer
});

export default persistReducer(persistConfig, rootReducer);