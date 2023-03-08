import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {NoteItemType} from "../../App";
import style from './NoteListView.module.css';
import styleFromTile from '../NoteTile/NoteTile.module.css';
import {Button} from "../Button/Button";
import {removeNoteTC, setNotesTC} from "../../redux/notesReducer";

type NotesListPropsType = {
	notes: Array<NoteItemType>
}

export const NoteListView = (props: NotesListPropsType) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(setNotesTC())
	}, [])
	const notesForRender: Array<NoteItemType> = props.notes


	const editNote = () => {
	}
	const removeNote = (noteID: string) => {
		dispatch(removeNoteTC(noteID))
	}


	return (
		<div className={style.note_list_view}>
			{
				props.notes.map(note => {
					return (
						<div className={style.note_line} key={note.id}>
							{note.title}
							<div className={styleFromTile.note_button_container}>
								<Button name={'Edit'} callback={editNote}
								        style={styleFromTile.edit_note_button}
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