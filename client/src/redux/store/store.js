import {createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {userLoginReducer, userProfileReducer, userRegistrationReducer} from "../reducers/userReducer"
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from '../reducers/noteReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegistrationReducer,
    noteList: noteListReducer,
    createNote: noteCreateReducer,
    updateNote: noteUpdateReducer,
    deleteNote:noteDeleteReducer,
    updateUser:userProfileReducer
});


const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) :null;

const initialState = {
    userLogin: {userInfo:userInfoFromStorage}
}

const middleware = [thunk];


const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

