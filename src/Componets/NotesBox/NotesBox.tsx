import React, {useEffect} from 'react';
import {NoteItemType} from "../../App";
import {NoteTile} from "../NoteTile/NoteTile";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../redux/store";
import {addNoteTC, setNotesTC} from "../../redux/notesReducer";
import style from './NotesList.module.css'

type NotesListPropsType = {
	notes: Array<NoteItemType>
}


export const NotesBox = (props: NotesListPropsType) => {
	const dispatch = useAppDispatch()
	//запрашиваем заметки из local storage при рендере компонента
	useEffect(() => {
		dispatch(setNotesTC())
	}, [])

	const notesForRender: Array<NoteItemType> = props.notes
	//добавляем новую заметку
	const createNewNote = () => {
		dispatch(addNoteTC())
	}

	return (
		<div className={style.notes_list}>
			<div className={style.add_new_note}>
				<Button name={'Add new note'} callback={createNewNote}
								style={style.add_new_note_button} classNameSpanButton={style.add_new_note_span_button}/>
			</div>
			<div className={style.notes_container}>

				{
					// MAP MAP MAP MAP MAP MAP MAP
					notesForRender.map(note => {
					return (
						<NoteTile key={note.id}
						          id={note.id}
						/>
					)
				})
				}
			</div>
		</div>
	);
};