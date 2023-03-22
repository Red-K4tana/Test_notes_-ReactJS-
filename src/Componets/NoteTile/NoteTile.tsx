import React, {useState} from 'react';
import style from './NoteTile.module.css'
import {EditableTitle} from "../EditableField/EditableTitle";
import {EditableDescription} from "../EditableField/EditableDescription";
import {Button} from "../Button/Button";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {
	changeEditModeNoteAC,
	NoteWithEditType,
	removeNoteTC,
	updateNoteTC
} from "../../redux/notesReducer";
import {useSelector} from "react-redux";



export type NotePropsType = {
	id: string,
}


export const NoteTile = (props: NotePropsType) => {
	const dispatch = useAppDispatch()
	//получаем из стора нужную заметку
	const note = useSelector<AppRootStateType, NoteWithEditType>(state => state.notesReducer
		.filter(note => note.id === props.id)[0])


	//=======================================================
	const [description, setDescription] = useState(note.description) // здесь хранится описание заметки в момент введения текста
	const [title, setTitle] = useState(note.title) // здесь хранится имя заметки в момент введения текста
	//=======================================================
	//сохраняем изменения в заметке после редактирования
	const saveNote = () => {
		dispatch(changeEditModeNoteAC(props.id,false)) //отключение режима редактирования
		dispatch(updateNoteTC(props.id, title, description)) //сохранение изменений в стор
	}
	//включение режима редактирования
	const editNote = () => {
		dispatch(changeEditModeNoteAC(props.id,true))
	}
	//удаление заметки
	const removeNote = () => {
		dispatch(removeNoteTC(props.id))
	}

	return (
		<div className={style.note_container}>
			<div className={style.note_title_and_buttons}>
				<div className={style.note_title}>
					<EditableTitle editMode={note.noteEditMode} title={title} setTitleCallback={setTitle}/>
				</div>
				<div className={style.note_button_container}>
					{
						note.noteEditMode
							?
							<Button name={'Save'} callback={saveNote}  style={style.save_note_button} classNameSpanButton={style.save_span_button}/>
							:
							<Button name={'Edit'} callback={editNote} style={style.edit_note_button} classNameSpanButton={style.edit_span_button}/>
					}
					<Button name={'Del'} callback={removeNote} style={style.remove_note_button} classNameSpanButton={style.remove_span_button}/>
				</div>
			</div>
			<div className={style.note_description}>
				<EditableDescription editMode={note.noteEditMode} description={description} setDescriptionCallback={setDescription}/>
			</div>
		</div>
	);
};