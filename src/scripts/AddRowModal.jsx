import React, { useState } from 'react'

const AddRowModal = (props) => {

    const [newDogData, setNewDogData] = useState({
        name: '',
        breed: '',
        age: '',
    })

    return (
        <div>
            <form>
                <div className='formField'>
                    <label>Name: </label>
                    <input type="text" name='name' value={ newDogData.name || ''} onChange={ (e) => setNewDogData({...newDogData, name: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Breed: </label>
                    <input type="text" name='breed' value={ newDogData.breed || ''} onChange={ (e) => setNewDogData({...newDogData, breed: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Age: </label>
                    <input type="text" name='age' value={ newDogData.age || ''} onChange={ (e) => setNewDogData({...newDogData, age: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <button disabled={ newDogData.name == '' || newDogData.breed == '' || newDogData.age == '' }>Enter</button>
                </div>
            </form>
            <button onClick={ props.hideModal }>Cancel</button> 
        </div>
    )
}
export default AddRowModal