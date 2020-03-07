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

    function increase() {
        onClickHandler && onClickHandler(indexCol)
    }

    function calculateRow() {
        onMouseEnterHandler && onMouseEnterHandler(indexRow, item)
    }

    function refreshRow() {
        onMouseLeaveHandler && onMouseLeaveHandler(indexRow)
    }

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