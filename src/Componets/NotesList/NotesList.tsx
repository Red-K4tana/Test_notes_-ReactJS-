import React from 'react';
import {NoteItemType} from "../../App";
import {Note} from "../Note/Note";
import {Button} from "../Button/Button";

type NotesListPropsType = {
	notes: Array<NoteItemType>
}


export const NotesList = (props: NotesListPropsType) => {

	const notesForRender: Array<NoteItemType> = props.notes

	const createNewNote = () => {
		const newNote: NoteItemType = {
			id: 'f87',
			title: 'Пароль от почты',
			description: '32321qwerty',
		}
		props.notes.push(newNote)
	}

	return (
		<div className={'notesList'}>
			<Button name={'Add new note'} callback={createNewNote}/>
			{notesForRender.map(note => {
				return (
					<Note key={note.id}
					      id={note.id}
					      title={note.title}
					      description={note.description}
					/>
				)
			})}
		</div>
	);
};
