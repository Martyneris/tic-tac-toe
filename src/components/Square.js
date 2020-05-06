import React from 'react'

export const Square = ({ value, handleClick }) => {
    return (
        <div className='square' onClick={() => handleClick()}>
            <h4>{value}</h4>
        </div>
    )
}