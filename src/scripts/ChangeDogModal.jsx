import React, { useState } from 'react'

const ChangeDogModal = (props) => {

    const [newDogData, setNewDogData] = useState(props.dogInfo)

    console.log('DOG INFO: ', props.dogInfo)
    return (
        <div>
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
                <div className='formField'>
                    <button disabled={ newDogData.name == '' || newDogData.breed == '' || newDogData.age == '' } 
                    onClick={ () => props.modifyDog(newDogData) }>Enter</button>
                </div>
            <button onClick={ props.hideModal /*Why does this break when made into an anonymous function?*/}>Cancel</button> 
        </div>
    )
}
export default ChangeDogModal