import React, { useState } from 'react'
import { Button } from '@element/react-components'

const DogFormModal = ({ dogInfo, alterDog, hideModal, modalName }) => {
    const [dogData, setDogData] = useState(dogInfo)

    return (
        <div className='modal'>
            <div className='flexBox'>
                <h2>{modalName}</h2>
                <div className='formField'>
                    <label>Name: </label>
                    <input type="text" name='name' value={ dogData.name } onChange={ (e) => setDogData({...dogData, name: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Breed: </label>
                    <input type="text" name='breed' value={ dogData.breed } onChange={ (e) => setDogData({...dogData, breed: e.target.value}) }/>
                </div>
                <div className='formField'>
                    <label>Age: </label>
                    <input type="text" name='age' value={ dogData.age } onChange={ (e) => setDogData({...dogData, age: Number(e.target.value)}) }/>
                </div>
            </div>
                <div className='formField flexBox'>
                    <Button 
                        disabled={ dogData.name == '' || dogData.breed == '' || dogData.age == '' } 
                        onClick={() => alterDog(dogData) }  
                        label='Enter'
                    />

                    <Button 
                        onClick={ hideModal}
                        label='Cancel'
                    />
                </div>
        </div>
    )
}
export default DogFormModal