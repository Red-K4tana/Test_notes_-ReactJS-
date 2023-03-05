import {NotesActionType, notesReducer} from "./notesReducer";
import {useDispatch} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';


export const rootReducer = combineReducers({
	notesReducer: notesReducer,
})

export const rootStore = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ActionsType = NotesActionType

//==============================================
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, ActionsType>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
//==============================================

//@ts-ignore
window.store = rootStore;