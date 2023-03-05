import React, {ChangeEvent, useState} from 'react';


type EditableTitlePropsType = {
	editMode: boolean
	title: string
	setTitleCallback: (title: string) => void
}

export const EditableTitle = (props: EditableTitlePropsType) => {



	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		props.setTitleCallback(e.currentTarget.value)
	}

	return (
		props.editMode
			?
			<input className={'inputEdit'}
			       value={props.title}
			       onChange={changeTitle}
			       autoFocus={true}
			/>
			:
			<span>
				{props.title}
			</span>
	);
};