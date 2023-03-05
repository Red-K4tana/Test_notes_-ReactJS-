import React, {ChangeEvent, useState} from 'react';
import style from './EditableFields.module.css';

type EditableTitlePropsType = {
	editMode: boolean
	description: string

}

export const EditableDescription = (props: EditableTitlePropsType) => {
	const [description, setDescription] = useState(props.description)
	const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.currentTarget.value)
	}


	return (
		props.editMode
			?
			<div className={style.textarea_description}>
				<textarea id={'textarea'}
				          value={description}
				          onChange={changeDescription}>
				</textarea></div>
			:
			<span>
				{props.description}
			</span>
	);
};