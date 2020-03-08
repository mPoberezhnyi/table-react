import React, { useState } from "react";
import Cell from "./components/Cell";
import Row from "./components/Row"

const m = 4;
const n = 5;

export default function App() {

	const randomNumber = () => Math.floor(100 + Math.random() * 899);

    const writeRow = (n) => {
        let array = new Array(n);
		array.fill({});
        return array.map(() => ({
            _id: Symbol('id'),
			amount: randomNumber()
		}))
    };

    const writeMatrix = (x, y) => {
        let array = new Array(n);
        array.fill([]);
        return array.map(() => writeRow(y))
    };

    const makeDefaultAvarageArray = (y) => {
        let array = new Array(y);
        array.fill(0);
        return array
    };

	const arr = writeMatrix(m, n);
	let defaultAvarageArray = makeDefaultAvarageArray(n);

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
        const newRow = writeRow(n);
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
				const currentRowSumm = rowSum[indexRow]
				return (<Row key={`row_${indexRow}`}
					 items={row}
					 removeRow={removeRow}
					 increase={increase}
					 indexRow={indexRow}
					 rowSum={currentRowSumm}/>)
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