# 리액트 Tic Tac Toc 게임

### 컴포넌트 구조
- Game
- Board
- Square

## Game 컴포넌트
```
import React, {  useRef, useState } from 'react';
import {Board} from './Component/Board';
import './App.css';

type HistoryType = { square: (string | null)[] }[];
type SquareTYpe = { square: (string | null)[] };

const Game: React.FunctionComponent = (props: {}) => {
    const [history, setHistory] = useState<HistoryType>([{ square: Array(9).fill(null) }]);
    const [changeNext, setChageNext] = useState<boolean>(true);
    const [stepNum, setStepNum] = useState<number>(0);
    const [playCheck, setPlayCheck] = useState<boolean>(true);
    let playCheckState : React.MutableRefObject<boolean>  = useRef<boolean>(true);

    const winner = (data: (string | null)[]): string | null => {
        const liens: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < liens.length; i++) {
            const [a, b, c] = liens[i];
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return data[a]
            }
        }
        return null
    }
    
    const playClick = (): void => {
        playCheckState.current = true;
        const history_: HistoryType = history;
        if (1 === history_.length) {
            return;
        }
        let i: number = (stepNum === history_.length - 1) ? 0 : stepNum;
        setPlayCheck(!playCheck)
        let playBtn = setInterval(() => {
            if (i < history_.length && playCheckState.current) {
                jumpTo(i++);
                if (history_.length === i) {
                    setPlayCheck(playCheck)
                }
            } else {
                clearInterval(playBtn);
            }
        }, 800)
    }

    const stopBtn = (): void => {
        setPlayCheck(!playCheck)
        playCheckState.current = false;
    }

    const showBtn = (): JSX.Element | null  => {
        if (0 < stepNum) {
            return (
                <div>
                    <input type="button" className="minusBtn" value="<" onClick={() => minusBtn()} />
                    <input type="button" className="plusBtn" value=">" onClick={() => plusBtn()} />
                </div>
            )
        } else {
            return null
        }
    }

    const minusBtn = (): void => {
        let i: number = 0;
        if (i < stepNum) {
            setStepNum(stepNum - 1)
        }
    }

    const plusBtn = (): void => {
        if (stepNum < history.length - 1) {
            setStepNum(stepNum + 1)
        }
    }

    const handleClick = (i: number): void => { 
        const history_: HistoryType = history.slice(0, stepNum + 1);
        const current: SquareTYpe = history_[history_.length - 1];
        const square_: (string | null)[] = current.square.slice();
        if (winner(square_) || square_[i]) {
            return;
        }
        square_[i] = changeNext ? 'X' : 'O';
        setHistory(history_.concat([{ square: square_ }]))
        setChageNext(!changeNext);
        setStepNum(history_.length);
    }

    const jumpTo = (index: number): void => {
        setStepNum(index);
        setChageNext((index % 2) === 0)
    }

    const history_: HistoryType = history;
    const current: SquareTYpe = history_[stepNum];
    const winner_: (string | null) = winner(current.square);
    const move: JSX.Element[] = history_.map((value_, index) => {
        const desc: string = index ? 'Go to move #' + index : 'Go to game start';
        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)}>{desc}</button>
            </li>
        )
    })
    

    let status: string ;
    if (winner_) {
        status = 'Winner: ' + winner_
    } else{
        status ='Next player: ' + (changeNext ? 'X' : 'O')
    }
    return (
            <div className="game-content">
                <Board
                    square={current.square}
                    onClick={handleClick}
                    />
                <div className="game-info">
                    <div className="game-title">{status}</div>
                    {playCheck ? (<button onClick={playClick}>play</button>) : ((<button onClick={stopBtn}>stop</button>))}
                    {showBtn()}
                    <ol>{move}</ol>
                </div>
            </div>
    )
}

export default Game
```

### Board 컴포넌트
```
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
```

# Square 컴포넌트
```
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
```
