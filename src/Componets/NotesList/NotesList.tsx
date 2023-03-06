import React, {useEffect} from 'react';
import {NoteItemType} from "../../App";
import {Note} from "../Note/Note";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../redux/store";
import {v1} from "uuid";
import {addNoteTC, setNotesTC} from "../../redux/notesReducer";

type NotesListPropsType = {
	notes: Array<NoteItemType>
}


export const NotesList = (props: NotesListPropsType) => {
	const dispatch = useAppDispatch()


	useEffect(()=> {
		dispatch(setNotesTC())
	},[])

	const notesForRender: Array<NoteItemType> = props.notes

	const createNewNote = () => {
		dispatch(addNoteTC())
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
