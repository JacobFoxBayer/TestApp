import React, { useState } from 'react'
import { Button } from '@element/react-components'

const AddRowModal = (props) => {

    const [newDogData, setNewDogData] = useState({
        name: '',
        breed: '',
        age: '',
    })

    return (
        <div className='modal'>
            <div className='flexBox'>
                <h2>Add a Dog</h2>
                <div className='formField'>
                    <label>Name: </label>
                    <input type="text" name='name' value={ newDogData.name } onChange={ (e) => setNewDogData({...newDogData, name: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Breed: </label>
                    <input type="text" name='breed' value={ newDogData.breed } onChange={ (e) => setNewDogData({...newDogData, breed: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Age: </label>
                    <input type="text" name='age' value={ newDogData.age } onChange={ (e) => setNewDogData({...newDogData, age: Number(e.target.value)}) }/>
                </div>
            </div>
                <div className='formField flexBox'>
                    <Button 
                        disabled={ newDogData.name == '' || newDogData.breed == '' || newDogData.age == '' } 
                        onClick={() => props.newDog(newDogData) }  
                        label='Enter'
                    />

                    <Button 
                        onClick={ props.hideModal /*Why does this break when made into an anonymous function?*/}
                        label='Cancel'
                    />
                </div>
        </div>
    )
}
export default AddRowModal