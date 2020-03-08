import React, { useState } from "react"
import Cell from "./components/Cell"
import Row from "./components/Row"
import {writeRow, writeMatrix, makeDefaultAvarageArray} from "./helper"
import Constants from "./constants"

export default function App() {

	const arr = writeMatrix(Constants.rowCount, Constants.cellCount);
	const defaultAvarageArray = makeDefaultAvarageArray(Constants.cellCount);

	const [state, setState] = useState(arr);

	const increase = (yIndex, xIndex) => {
        const currentNumber = state[yIndex][xIndex];
        const newState = [...state];

        newState[yIndex][xIndex].amount = currentNumber.amount + 1;

		setState(newState);
    };

    const rowSum = state.reduce((acc, currentTop) => {
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
        const newRow = writeRow(Constants.cellCount);
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
				const currentRowSumm = rowSum[indexRow];
				return (
					<Row key={`row_${currentRowSumm}`}
					 items={row}
					 removeRow={removeRow}
					 increase={increase}
					 indexRow={indexRow}
					 rowSum={currentRowSumm}/>
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