// import { createStore } from 'redux';
// import AppReducer from './reducers/AppReducers';
//
// export default createStore(AppReducer)


import { applyMiddleware, createStore, combineReducers } from "redux";
import AppReducer from "./reducers/AppReducers";
import thunk  from "redux-thunk";

export default createStore(
    combineReducers({
        statedata: AppReducer
    }),
    {},
    applyMiddleware(thunk )
);
