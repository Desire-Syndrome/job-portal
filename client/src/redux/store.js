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
} from "./reducers/UserReducer";
import {
companyRegisterReducer, companyLoginReducer, companyUpdateReducer, companyRemoveReducer,
} from "./reducers/CompanyReducer";


const rootReducer = combineReducers({
	 userRegisterReducer, userLoginReducer, userUpdateReducer, userRemoveReducer,

	 companyRegisterReducer, companyLoginReducer, companyUpdateReducer, companyRemoveReducer,
	 
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];
export const store = createStore(persistedReducer, applyMiddleware(...middleware));

export let persistor = persistStore(store);