import React from 'react'

const Card1 = ({ image, title, description, buttonText, handleonClick }) => {
    return (
        <div className=' flex flex-col '>
            <div className=''>
                <div className='w-20 h-20'>
                    <img src={image} alt="" />
                </div>
                <h1>{title}</h1>
                <p>{description}</p>
                <button onClick={handleonClick} className='bg-red-300 p-2'>{buttonText}</button>
            </div>
        </div>
    )
}

export default Card1; 