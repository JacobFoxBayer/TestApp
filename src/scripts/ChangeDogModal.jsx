import React, { useState } from 'react'

const ChangeDogModal = (props) => {

    const [modifiedDogData, setModifiedDogData] = useState(props.dogInfo)

    console.log('DOG INFO: ', props.dogInfo)
    return (
        <div>
            <h2>Modify a Dog</h2>
            <div className='formField'>
                <label>Name: </label>
                <input type="text" name='name' value={ modifiedDogData.name } onChange={ (e) => setModifiedDogData({...modifiedDogData, name: e.target.value}) }/>
            </div>
            <div className='formField'>
                <label>Breed: </label>
                <input type="text" name='breed' value={ modifiedDogData.breed } onChange={ (e) => setModifiedDogData({...modifiedDogData, breed: e.target.value}) }/>
            </div>
            <div className='formField'>
                <label>Age: </label>
                <input type="text" name='age' value={ modifiedDogData.age } onChange={ (e) => setModifiedDogData({...modifiedDogData, age: Number(e.target.value)}) }/>
            </div>
            <div className='formField'>
                <button disabled={ modifiedDogData.name == '' || modifiedDogData.breed == '' || modifiedDogData.age == '' } 
                onClick={ () => props.modifyDog(modifiedDogData) }>Enter</button>
            </div>
            <button onClick={ props.hideModal /*Why does this break when made into an anonymous function?*/}>Cancel</button> 
        </div>
    )
}
export default ChangeDogModal