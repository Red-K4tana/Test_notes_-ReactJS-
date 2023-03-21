import {v1} from "uuid";
import {AppRootStateType, TypedDispatch} from "./store";
import {ID_localStorage} from "../../../Test_notes_-ReactJS-/src/App";

// NOTES ACTIONS =======================================================================================================
export enum NOTES_ACTION_TYPE_NAME {
	SET_NOTES = 'SET_NOTES',
	ADD_NOTES_ITEM = 'ADD_NOTES_ITEM',
	REMOVE_NOTES_ITEM = 'REMOVE_NOTES_ITEM',
	UPDATE_NOTES = 'UPDATE_NOTES',
	CHANGE_EDIT_MODE_NOTES = 'CHANGE_EDIT_MODE_NOTES',
}

export type NotesActionType =
	setNotesActionType
	| addNoteActionType
	| removeNoteActionType
	| updateNotesActionType
| changeEditModeNoteActionType

export type setNotesActionType = {
	type: NOTES_ACTION_TYPE_NAME.SET_NOTES,
	notes: Array<NoteWithEditType>,
}
export type addNoteActionType = {
	type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM,
}
export type removeNoteActionType = {
	type: NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM,
	noteID: string,
}
export type updateNotesActionType = {
	type: NOTES_ACTION_TYPE_NAME.UPDATE_NOTES,
	notesID: string,
	title: string,
	description: string,
}
export type changeEditModeNoteActionType = {
	type: NOTES_ACTION_TYPE_NAME.CHANGE_EDIT_MODE_NOTES,
	notesID: string,
	noteEditMode: boolean,
}

export const setNotesAC = (notes: Array<NoteWithEditType>): setNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.SET_NOTES, notes} as const
}
export const addNoteAC = (): addNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM} as const
}
export const removeNoteAC = (noteID: string): removeNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM, noteID} as const
}
export const updateNoteAC = (noteID: string, title: string, description: string): updateNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.UPDATE_NOTES, notesID: noteID, title, description} as const
}
export const changeEditModeNoteAC = (notesID: string, noteEditMode: boolean): changeEditModeNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.CHANGE_EDIT_MODE_NOTES, notesID: notesID, noteEditMode} as const
}

// NOTES THUNK-CREATORS ================================================================================================
// добавление заметки
export const addNoteTC = () => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
	dispatch(addNoteAC())
	const notesWithoutEditMode: Array<NoteItemType>  = getState().notesReducer.map(note => ({id: note.id, title: note.title, description: note.description}))

	localStorage.setItem(ID_localStorage, JSON.stringify(notesWithoutEditMode))
}
// удаление заметки
export const removeNoteTC = (noteID: string) => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
	dispatch(removeNoteAC(noteID))
	const notesWithoutEditMode: Array<NoteItemType>  = getState().notesReducer.map(note => ({id: note.id, title: note.title, description: note.description}))

	localStorage.setItem(ID_localStorage, JSON.stringify(notesWithoutEditMode))
}
// изменение заметки
export const updateNoteTC = (noteID: string, title: string, description: string) =>
	(dispatch: TypedDispatch, getState: () => AppRootStateType) => {
  dispatch(updateNoteAC(noteID, title, description))
		const notesWithoutEditMode: Array<NoteItemType>  = getState().notesReducer.map(note => ({id: note.id, title: note.title, description: note.description}))
	localStorage.setItem(ID_localStorage, JSON.stringify(notesWithoutEditMode))
}
// наполнение state из localStorage
export const setNotesTC = () => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
	const stateFromLocalStorage: any = localStorage.getItem(ID_localStorage) // достал state из localStorage
	// если в localStorage пусто, то отправляем пустой массив в reducer
	if (stateFromLocalStorage === null) {
		dispatch(setNotesAC([]))
	} else {
		const withEditMode: Array<NoteWithEditType> = JSON.parse(stateFromLocalStorage).map((note: NoteItemType) => ({...note, noteEditMode: false}))
		dispatch(setNotesAC(withEditMode)) // отправил state в reducer

		const notesWithoutEditMode: Array<NoteItemType> = getState().notesReducer.map(note => ({id: note.id, title: note.title, description: note.description}))
		localStorage.setItem(ID_localStorage, JSON.stringify(notesWithoutEditMode)) // получил state из reducer и отправил его в localStorage
	}
}

// NOTES REDUCER =======================================================================================================
export type NoteItemType = {
	id: string,
	title: string,
	description: string,
}
export type NoteWithEditType = NoteItemType & {noteEditMode: boolean}

const baseNoteID = 'id_1';
const initialState: Array<NoteWithEditType> = [{
	id: baseNoteID,
	title: 'Base note!!!',
	description: 'Base note description!!!',
	noteEditMode: false,
}]

export const notesReducer = (state = initialState, action: NotesActionType): Array<NoteWithEditType> => {
	switch (action.type) {
		case NOTES_ACTION_TYPE_NAME.SET_NOTES: {
			// если в localStorage есть базовая заметка, то она не добавляется, а если нет, то добавится
			if (action.notes.findIndex(note => note.id === baseNoteID) !== -1) {
				return [...action.notes]
			} else {
				return [...state, ...action.notes]
			}
		}
		case NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM: {
			const newID = v1()
			const newNote: NoteWithEditType = {
				id: newID,
				title: 'Title',
				description: 'Note text',
				noteEditMode: false,
			}
			return [...state, newNote]
		}
		case NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM: {
			return state.filter(note => note.id !== action.noteID)
		}
		case NOTES_ACTION_TYPE_NAME.UPDATE_NOTES: {
			return state.map(note => note.id === action.notesID
				? {...note, title: action.title, description: action.description}
				: note)
		}
		case NOTES_ACTION_TYPE_NAME.CHANGE_EDIT_MODE_NOTES: {
			return state.map(note => note.id === action.notesID ? {...note, noteEditMode: action.noteEditMode} : note)
		}
		default: {
			return state
		}
	}
}