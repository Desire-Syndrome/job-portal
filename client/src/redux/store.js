import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
	key: 'root',
	storage
}


import {
userRegisterReducer, userLoginReducer, userUpdateReducer, userRemoveReducer,
userApplyReducer, userApplicationsReducer
} from "./reducers/UserReducer";
import {
companyRegisterReducer, companyLoginReducer, companyUpdateReducer, companyRemoveReducer,
companyAddJobReducer, companyGetJobsReducer, companyJobVisibilityReducer, companyApplicantsReducer
} from "./reducers/CompanyReducer";
import {
jobsListReducer, jobReducer
} from "./reducers/JobReducer";


const rootReducer = combineReducers({
	 userRegisterReducer, userLoginReducer, userUpdateReducer, userRemoveReducer,
	 userApplyReducer, userApplicationsReducer,
	 companyRegisterReducer, companyLoginReducer, companyUpdateReducer, companyRemoveReducer,
	 companyAddJobReducer, companyGetJobsReducer, companyJobVisibilityReducer, companyApplicantsReducer,
	 jobsListReducer, jobReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];
export const store = createStore(persistedReducer, applyMiddleware(...middleware));

export let persistor = persistStore(store);