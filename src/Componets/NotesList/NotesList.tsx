import React, {useEffect} from 'react';
import {ID_localStorage, NoteItemType} from "../../App";
import {Note} from "../Note/Note";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../redux/store";
import {v1} from "uuid";
import {addNoteAC, addNoteTC, setNotesTC} from "../../redux/notesReducer";

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
		const newID = v1()
		const newNote: NoteItemType = {
			id: newID,
			title: 'Title',
			description: 'Note text',
		}
		dispatch(addNoteTC(newNote))
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
