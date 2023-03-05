import React, {ChangeEvent, useState} from 'react';


type EditableTitlePropsType = {
	editMode: boolean
	title: string

}

export const EditableTitle = (props: EditableTitlePropsType) => {


	const [title, setTitle] = useState(props.title)
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		props.editMode
			?
			<input className={'inputEdit'}
			       value={title}
			       onChange={changeTitle}
			       autoFocus={true}
			/>
			:
			<span>
				{props.title}
			</span>
	);
};