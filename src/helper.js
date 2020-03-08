import Constants from "./constants"

const randomNumber = () => Math.floor(100 + Math.random() * 899);

const makeDefaultAvarageArray = (row) => (new Array(row).fill(0));

const writeMatrix = (row, cell) => {
	const array = new Array(row).fill([]);
	return array.map(() => writeRow(cell))
};

export const writeRow = () => {
	const array = new Array(Constants.cellCount).fill({});
	return array.map(() => ({
		_id: Symbol('id'),
		amount: randomNumber()
	}))
};

export const arr = writeMatrix(Constants.rowCount, Constants.cellCount);

export const defaultAvarageArray = makeDefaultAvarageArray(Constants.cellCount);