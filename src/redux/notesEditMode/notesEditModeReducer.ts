import {v1} from "uuid";


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
export const addNoteAC = (): addNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM} as const
}
export const removeNoteAC = (noteID: string): removeNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM, noteID} as const
}
export const updateNoteAC = (noteID: string, title: string, description: string): updateNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.UPDATE_NOTES, notesID: noteID, title, description} as const
}


// NOTES REDUCER =======================================================================================================
const baseNoteID = 'id_1';
const initialState: Array<NoteItemType> = [{
	id: baseNoteID,
	title: 'Base note!!!',
	description: 'Base note description!!!',
}]

export const notesReducer = (state = initialState, action: NotesActionType): NoteStateType => {
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
			const newNote: NoteItemType = {
				id: newID,
				title: 'Title',
				description: 'Note text',
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
		default: {
			return state
		}
	}
}