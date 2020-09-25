import React from 'react';
import { Square } from './Square';

export interface IBoardProps {
    square: (string | null)[]
    onClick: (i : number) => void
}

export const Board: React.FunctionComponent<IBoardProps> = (props: IBoardProps) => {
    const renderSquarePage = (i : number) => {
        return (
            <Square
                value={props.square[i]}
                onClick={() => props.onClick(i)}
            />
        )
    }

    return (
        <div className="board-content">
            <div className="board-row">
                {renderSquarePage(0)}
                {renderSquarePage(1)}
                {renderSquarePage(2)}
            </div>
            <div className="board-row">
                {renderSquarePage(3)}
                {renderSquarePage(4)}
                {renderSquarePage(5)}
            </div>
            <div className="board-row">
                {renderSquarePage(6)}
                {renderSquarePage(7)}
                {renderSquarePage(8)}
            </div>
        </div>
    )
}