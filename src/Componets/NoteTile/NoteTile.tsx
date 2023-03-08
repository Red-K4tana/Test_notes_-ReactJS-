import React, {useState} from 'react';
import style from './NoteTile.module.css'
import {EditableTitle} from "../EditableField/EditableTitle";
import {EditableDescription} from "../EditableField/EditableDescription";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../redux/store";
import {removeNoteAC, removeNoteTC, updateNoteAC, updateNoteTC} from "../../redux/notesReducer";



export type NotePropsType = {
	id: string,
	title: string,
	description: string,
}


export const NoteTile = (props: NotePropsType) => {
	const dispatch = useAppDispatch()
	const [editMode, setEditMode] = useState(false)

	//=======================================================
	const [description, setDescription] = useState(props.description)
	const [title, setTitle] = useState(props.title)
	//=======================================================

	const saveNote = () => {
		setEditMode(false)
		dispatch(updateNoteTC(props.id, title, description))
	}
	const editNote = () => {
		setEditMode(true)
	}
	const removeNote = () => {
		dispatch(removeNoteTC(props.id))
	}

	return (
		<div className={style.note_container}>
			<div className={style.note_title_and_buttons}>
				<div className={style.note_title}>
					<EditableTitle editMode={editMode} title={title} setTitleCallback={setTitle}/>
				</div>
				<div className={style.note_button_container}>
					{
						editMode
							?
							<Button name={'Save'} callback={saveNote}  style={style.save_note_button} classNameSpanButton={style.save_span_button}/>
							:
							<Button name={'Edit'} callback={editNote} style={style.edit_note_button} classNameSpanButton={style.edit_span_button}/>
					}
					<Button name={'Del'} callback={removeNote} style={style.remove_note_button} classNameSpanButton={style.remove_span_button}/>
				</div>
			</div>
			<div className={style.note_description}>
				<EditableDescription editMode={editMode} description={description} setDescriptionCallback={setDescription}/>
			</div>
		</div>
	);
};