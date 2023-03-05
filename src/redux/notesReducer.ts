import {v1} from "uuid";

export type NoteItemType = {
	id: string,
	title: string,
	description: string,
}
export type NoteStateType = Array<NoteItemType>

const id_1 = v1();
const id_2 = v1();


const initialState: Array<NoteItemType> = [
	{
		id: id_1,
		title: 'Пароль от почты',
		description: '32321qwerty',
	},
	{
		id: id_2,
		title: 'Даты дней рожденья друзей',
		description: 'Коля 05.11.1990, Вася 23.06.1995',
	},
]


export const notesReducer = (state = initialState, action: NotesActionType): NoteStateType => {
	switch (action.type) {
		case NOTES_ACTION_TYPE_NAME.SET_NOTES: {
			return state
		}
		case NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM: {
			return [...state, action.note]
		}
		case NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM: {
			return state.filter(note => note.id !== action.noteID)
		}
		case NOTES_ACTION_TYPE_NAME.UPDATE_NOTES: {
			return state
		}
		default: {
			return state
		}
	}
}

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
	note: NoteItemType,
}

export const setNotesAC = (notesID: string, notes: Array<NoteItemType>): setNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.SET_NOTES, notes} as const
}
export const addNoteAC = (note: NoteItemType): addNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.ADD_NOTES_ITEM, note} as const
}
export const removeNoteAC = (noteID: string): removeNoteActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.REMOVE_NOTES_ITEM, noteID} as const
}
export const updateNotesAC = (noteID: string, note: NoteItemType): updateNotesActionType => {
	return {type: NOTES_ACTION_TYPE_NAME.UPDATE_NOTES, notesID: noteID, note} as const
}