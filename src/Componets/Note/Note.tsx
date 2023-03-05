import React, {useState} from 'react';
import style from './Note.module.css'
import {EditableTitle} from "../EditableField/EditableTitle";


export type NotePropsType = {
	id: string,
	title: string,
	description: string,
}


export const Note = (props: NotePropsType) => {
	const [editMode, setEditMode] = useState(false)

	return (
		<div className={style.note_container}>
			<EditableTitle editMode={editMode} title={props.title}/>
		</div>
	);
};