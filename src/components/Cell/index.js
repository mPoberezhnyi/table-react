import React from "react";

export default function Cell({
    item,
    onClickHandler,
    onMouseEnterHandler,
    onMouseLeaveHandler,
    indexRow,
    indexCol,
    style,
    customClass}) {

    const increase = () => {
        if (onClickHandler) {
			onClickHandler(indexCol)
        }
    };

    const calculateRow = () => {
        if (onMouseEnterHandler) {
			onMouseEnterHandler(indexRow, item)
        }
    };

    const refreshRow = () => {
        if (onMouseLeaveHandler) {
			onMouseLeaveHandler(indexRow)
        }
    };

    return (
        <span onClick={increase}
              onMouseEnter={calculateRow}
              onMouseLeave={refreshRow}
              style={style}
              className={customClass}>
            {item}
        </span>
    )
}