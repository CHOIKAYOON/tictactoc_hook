import React from 'react';

export interface ISquareProps {
    value : string | null
    onClick : () => void
}

export const Square : React.FunctionComponent<ISquareProps> = (props : ISquareProps) => {
    return (
        <button className="button" onClick={props.onClick} >
            {props.value}
        </button>
    )
}

