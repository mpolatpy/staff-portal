import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import teachersReducer from './teachers/teachers.reducer';
import observationFormReducer from './observation-form/oservation-form.reducer';
import yearReducer from './school-year/school-year.reducer';

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    teachers: teachersReducer,
    observationForm: observationFormReducer,
    schoolYear: yearReducer,
});

export default persistReducer(persistConfig, rootReducer);