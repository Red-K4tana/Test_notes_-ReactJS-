import {v1} from "uuid";
import {AppRootStateType, TypedDispatch} from "./store";
import {ID_localStorage} from "../App";

export type NoteItemType = {
	id: string,
	title: string,
	description: string,
}
export type NoteStateType = Array<NoteItemType>

// NOTES ACTIONS =======================================================================================================
export enum NOTES_ACTION_TYPE_NAME {
	SET_NOTES = 'SET_NOTES',
	ADD_NOTES_ITEM = 'ADD_NOTES_ITEM',
	REMOVE_NOTES_ITEM = 'REMOVE_NOTES_ITEM',
	UPDATE_NOTES = 'UPDATE_NOTES',
}

export type NotesActionType =
	setNotesActionType
	| addNoteActionType
	| removeNoteActionType
	| updateNotesActionType

export type setNotesActionType = {
	type: NOTES_ACTION_TYPE_NAME.SET_NOTES,
	notes: Array<NoteItemType>,
}
export type addNoteActionType = {
	type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM,
	note: NoteItemType,
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

export const setNotesAC = (notes: Array<NoteItemType>): setNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.SET_NOTES, notes} as const
}
export const addNoteAC = (note: NoteItemType): addNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM, note} as const
}
export const removeNoteAC = (noteID: string): removeNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM, noteID} as const
}
export const updateNotesAC = (noteID: string, title: string, description: string): updateNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.UPDATE_NOTES, notesID: noteID, title, description} as const
}

// NOTES THUNK-CREATORS ================================================================================================
export const addNoteTC = (note: NoteItemType) => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
	dispatch(addNoteAC(note))
	const state = getState()
	const stateStringify = JSON.stringify(state)

	localStorage.setItem(ID_localStorage, stateStringify)

}
export const removeNoteTC = (noteID: string) => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
	dispatch(removeNoteAC(noteID))
	const state = getState()
	const stateStringify = JSON.stringify(state)

	localStorage.setItem(ID_localStorage, stateStringify)

}
export const setNotesTC = () => (dispatch: TypedDispatch) => {
	const stateFromLocalStorage: any = localStorage.getItem(ID_localStorage)
	/*console.log('from ls ', JSON.parse(stateFromLocalStorage).notesReducer)*/

	// если в localStorage пусто, то отправляем пустой массив в редьюсер
	if (stateFromLocalStorage === null) {
		dispatch(setNotesAC([]))
	} else {
		dispatch(setNotesAC(JSON.parse(stateFromLocalStorage).notesReducer))
	}


}

// NOTES REDUCER =======================================================================================================

const initialState: Array<NoteItemType> = []

export const notesReducer = (state = initialState, action: NotesActionType): NoteStateType => {
	switch (action.type) {
		case NOTES_ACTION_TYPE_NAME.SET_NOTES: {
			const baseNote: NoteItemType = {
				id: 'id_1',
				title: 'Base note',
				description: 'Base note description',
			};

			const baseNoteBefore = action.notes.filter(note => note.id === baseNote.id)



			return [baseNote, ...action.notes]
		}
		case NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM: {
			return [...state, action.note]
		}
		case NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM: {
			return state.filter(note => note.id !== action.noteID)
		}
		case NOTES_ACTION_TYPE_NAME.UPDATE_NOTES: {
			return state.map(note => note.id === action.notesID
				? {...note, title: action.title, description: action.description}
				: note)
		}
		default: {
			return state
		}
	}
}