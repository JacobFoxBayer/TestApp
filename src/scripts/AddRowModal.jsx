import React, { useState } from 'react'

const AddRowModal = (props) => {

    console.log(props)
    return (//How to access state variable to make cancel button work?
        <div className='Obvious'>
            <h1>hello earfling</h1>
            <button onClick={ props.hideModal }>cancel</button> 
        </div>
    )
}
export default AddRowModal