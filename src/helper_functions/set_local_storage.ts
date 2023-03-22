import {ID_localStorage} from "../App";
import {NoteItemType, NoteWithEditType} from "../redux/notesReducer";

type stateType = {
	notesReducer: Array<NoteWithEditType>
}
// функция преобразования объекта заметки из формата стора в формат хранения в local storage,
// путем отсекания свойства noteEditMode
export const setLocalStorage = (state: stateType) => {
	const notesWithoutEditMode: Array<NoteItemType>  = state.notesReducer
		.map(note => ({id: note.id, title: note.title, description: note.description}))
	localStorage.setItem(ID_localStorage, JSON.stringify(notesWithoutEditMode))
}