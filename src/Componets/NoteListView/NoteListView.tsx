import React, {useEffect} from 'react';
import {useAppDispatch} from "../../redux/store";
import {NoteItemType} from "../../App";
import style from './NoteListView.module.css';
import styleFromTile from '../NoteTile/NoteTile.module.css';
import {Button} from "../Button/Button";
import {changeEditModeNoteAC, removeNoteTC, setNotesTC} from "../../redux/notesReducer";
import {Navigate} from "react-router-dom";

type NotesListPropsType = {
	notes: Array<NoteItemType>
	viewMode: boolean
	changeViewModeCallback: (viewMode: boolean) => void
}

export const NoteListView = (props: NotesListPropsType) => {
	const dispatch = useAppDispatch()
	//запрашиваем заметки из local storage при рендере компонента
	useEffect(() => {
		dispatch(setNotesTC())
	}, [])
	//включаем режим редактирования заметки (сначала отрендерится нужный компонент, потом в нем включится редактирование на нужной заметке)
	const editNote = (noteID: string) => {
		props.changeViewModeCallback(true)
		dispatch(changeEditModeNoteAC(noteID,true))
		setTimeout(()=>{
			dispatch(changeEditModeNoteAC(noteID,true))
		}, 50)
	}
	//удаление заметки
	const removeNote = (noteID: string) => {
		dispatch(removeNoteTC(noteID))
	}
	//если при загрузке компонента viewMode === true, то этот компонент размонтируется, а NotesBox вмонтируется
	if (props.viewMode) {
		return <Navigate to={'/'} />
	}

	return (
		<div className={style.note_list_view}>
			{
				// MAP MAP MAP MAP MAP MAP MAP
				props.notes.map(note => {
					return (
						<div className={style.note_line} key={note.id}>
							{note.title}
							<div className={styleFromTile.note_button_container}>
								<Button name={'Edit'} callback={()=>editNote(note.id)} style={styleFromTile.edit_note_button}
												classNameSpanButton={styleFromTile.edit_span_button}/>
								<Button name={'Del'} callback={()=>removeNote(note.id)}
								        style={styleFromTile.remove_note_button}
								        classNameSpanButton={styleFromTile.remove_span_button}/>
							</div>
						</div>
					)
				})
			}
		</div>
	);
};