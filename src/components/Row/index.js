import React, { useState } from 'react'
import Cell	from '../Cell'

export default function Row({items, indexRow, rowSum, increase, removeRow}) {

	const persents = () => items.map(item => (Math.floor(item.amount / (rowSum / 100))));

	const onClickHandler = (indexCol) => increase(indexRow, indexCol);

	const percentageRow = persents().map((persent, indexCol) => <Cell key={`row-persent-${indexRow}-col_${indexCol}`}
		 item={`${persent}%`}
		 style={{background: `linear-gradient(to top, rgba(32, 124, 255, .4) ${persent}%, rgba(255, 255, 255, 0) 0%)`}}
		 customClass='item'/>
	);

	const normalRow = items.map((item, indexCol) => (
		<Cell key={`row-normal-${indexRow}-col-${indexCol}`}
			  item={item.amount}
			  onClickHandler={onClickHandler}
			  indexRow={indexRow}
			  indexCol={indexCol}
			  customClass='item' />
	));

	const [row, setRow] = useState(normalRow);


	const onMouseEnterHandler = () => setRow(percentageRow);

	const onMouseLeaveHandler = () => setRow(normalRow);

	const remove = () => removeRow(indexRow);

	return (
		<div className='row'>
			<button className="button remove-row"
					onClick={remove}>
				-
			</button>
			{ row }
			<Cell key={`sum_${indexRow}`}
				  item={rowSum}
				  indexRow={indexRow}
				  onMouseEnterHandler={onMouseEnterHandler}
				  onMouseLeaveHandler={onMouseLeaveHandler}
				  customClass='item sum' />
		</div>

	)
}