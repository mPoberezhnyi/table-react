import React, { useState } from "react"
import Cell from "./components/Cell"
import Row from "./components/Row"
import {writeRow, arr, defaultAvarageArray} from "./helper"

export default function App() {

	const [state, setState] = useState(arr);

	const increase = (yIndex, xIndex) => {
        const currentNumber = state[yIndex][xIndex];
        const newState = [...state];
        newState[yIndex][xIndex].amount = currentNumber.amount + 1;
		setState(newState);
    };

    const rowSumm = state.reduce((acc, currentTop) => {
        const currentRowSumm = currentTop.reduce(
            (currentRowRes, currentRowValue) => {
                return currentRowRes + currentRowValue.amount;
            },
            0
        );
        return [...acc, currentRowSumm];
    }, []);

	const rowAvarage = state.reduce(
        (currentAvarage, row) => {
            const res = row.reduce((rowAcc, value, indexCol) => {
                const newCurrentAvarage = [...rowAcc];
                newCurrentAvarage[indexCol] = newCurrentAvarage[indexCol] + value.amount;
                return newCurrentAvarage;
            }, currentAvarage);
            return res;
        },
        [...defaultAvarageArray]
    );

    const addRow = () => {
        const newRow = writeRow();
        const newState = [...state, newRow];
        setState(newState)
    };

    const removeRow = (indexRow) => {
        const newState = [
			...state.slice(0, indexRow),
			...state.slice(indexRow + 1)
        ];
        setState(newState)
    };

    return (
        <div className="wrapper">
            {state.map((row, indexRow) => {
				const currentRowSumm = rowSumm[indexRow];
				return (
					<Row key={`row_${currentRowSumm+state.length}`}
					 items={row}
					 removeRow={removeRow}
					 increase={increase}
					 indexRow={indexRow}
					 rowSumm={currentRowSumm}/>
				)
			})}

            {rowAvarage.map((el, idx) => (
                <Cell key={`avarage_${idx}`}
                    item={Math.floor(el / state.length)}
                    customClass='item avarage' />
            ))}

            <button className="button add-row"
					onClick={addRow}>
                +
            </button>
        </div>
    );
}