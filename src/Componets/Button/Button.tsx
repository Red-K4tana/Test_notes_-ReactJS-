import React from 'react';
import sl from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    style?: string
    classNameSpanButton?: string
    svgIcon?: any
}

export const Button = React.memo( (props: ButtonPropsType) => {

    return (
        <label className={props.classNameSpanButton}>
            <button className={`${props.style} `}
                    onClick={()=>props.callback()}
            >
                {props.name}
            </button>
            <span>
              {props.svgIcon}
            </span>
        </label>
    );
});
