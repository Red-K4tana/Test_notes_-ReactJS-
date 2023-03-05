import {applyMiddluware, combineReducers, createStore} from "redux";
import {NotesActionType, notesReducer} from "./notesReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


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