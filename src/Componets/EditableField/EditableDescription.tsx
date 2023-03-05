import React, {ChangeEvent, useState} from 'react';
import style from './EditableFields.module.css';

type EditableTitlePropsType = {
	editMode: boolean
	description: string
	setDescriptionCallback: (description: string)=> void
}

export const EditableDescription = (props: EditableTitlePropsType) => {

	const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.setDescriptionCallback(e.currentTarget.value)
	}


	return (
		props.editMode
			?
			<div className={style.textarea_description}>
				<textarea id={'textarea'}
				          value={props.description}
				          onChange={changeDescription}>
				</textarea></div>
			:
			<span>
				{props.description}
			</span>
	);
};