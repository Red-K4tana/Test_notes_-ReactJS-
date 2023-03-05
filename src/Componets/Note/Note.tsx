import React, {useState} from 'react';
import style from './Note.module.css'
import {EditableTitle} from "../EditableField/EditableTitle";
import {EditableDescription} from "../EditableField/EditableDescription";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../redux/store";
import {removeNoteAC} from "../../redux/notesReducer";


export type NotePropsType = {
	id: string,
	title: string,
	description: string,
}


export const Note = (props: NotePropsType) => {
	const dispatch = useAppDispatch()
	const [editMode, setEditMode] = useState(false)

	const saveNote = () => {
		setEditMode(false)

		//dispatch

	}
	const editNote = () => {
		setEditMode(true)
	}
	const removeNote = () => {
		dispatch(removeNoteAC(props.id))
	}

	return (
		<div className={style.note_container}>
			{
				editMode
					?
					<Button name={'Save'} callback={saveNote}/>
					:
					<Button name={'Edit'} callback={editNote} />
			}
			<Button name={'Del'} callback={removeNote} />
			<EditableTitle editMode={editMode} title={props.title}/>
			<EditableDescription editMode={editMode} description={props.description}/>
		</div>
	);
};