export const randomNumber = () => Math.floor(100 + Math.random() * 899);

export const writeRow = (cell) => {
	const array = new Array(cell).fill({});
	return array.map(() => ({
		_id: Symbol('id'),
		amount: randomNumber()
	}))
};

export const writeMatrix = (row, cell) => {
	const array = new Array(row).fill([]);
	return array.map(() => writeRow(cell))
};

export const makeDefaultAvarageArray = (row) => (new Array(row).fill(0));