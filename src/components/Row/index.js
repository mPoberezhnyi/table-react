import React, { useState } from 'react'
import Cell	from '../Cell'

export default function Row({items, indexRow, rowSum, increase}) {
	const persents = () => items.map(item => (Math.floor(item.amount / (rowSum / 100))));

	const avarage = <div className="row-avarage">
		{persents().map((persent, indexCol) => <Cell key={`col_persent_${indexCol}`}
			 item={`${persent}%`}
			 style={{background: `linear-gradient(to top, rgba(32, 124, 255, .4) ${persent}%, rgba(255, 255, 255, 0) 0%)`}}
			 customClass='item'/>
		)}
	</div>;

	function onClickHandler(indexCol) {
		increase(indexRow, indexCol)
	}

	const normal = <div className="row-normal">
		{items.map((item, indexCol) => (
			<Cell key={`col_${indexCol}`}
				  item={item.amount}
				  onClickHandler={onClickHandler}
				  indexRow={indexRow}
				  indexCol={indexCol}
				  customClass='item' />
		))}
	</div>;

	const [row, setRow] = useState(normal);

	function onMouseEnterHandler() {
		setRow(avarage)
	}

	function onMouseLeaveHandler() {
		setRow(normal)
	}

	return (
		<div className='row'>
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