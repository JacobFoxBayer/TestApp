import React, {useState, useEffect} from 'react'
import {queries, queryProfile} from '@monsantoit/profile-client'
import AddRowModal from './AddRowModal' //If using default export, no need for curly braces. If using named export, use curly braces.
import ChangeDogModal from './ChangeDogModal'
import { async } from 'regenerator-runtime'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { Button } from '@element/react-components'

/*

Thoughts:

    * The way that dog ids are currently set is error prone.
      ie If dog 2 is deleted and then another dog is added,
      there are now two dogs with an id of 3. Glitchy things
      happen when you try to delete one of them.

    * Having a component for each modal is unnecessary.
      They could be consolidated.

    * The variable names used are can be confusing. If
      anyone else tried to read this, they would have a 
      hard time understanding what is going on.

    * The styling could obviously be improved.

*/

const Table = () => {

    // placeholder posts URL -- GET to https://jsonplaceholder.typicode.com/posts

    const [ tableData, setTableData ] = useState([])
    const [ addModalDisplayed, setAddModalDisplayed ] = useState(false)
    const [ changeModalDisplayed, setChangeModalDisplayed ] = useState(false)
    const [ changeModalData, setChangeModalData ] = useState({})

    useEffect(() => {
        const getTableData = async () => {
            const fetchResult = await fetch('/test/v1/graphql', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({
                query: `
                    query GetDogData{
                        getData{
                        name
                        breed
                        age
                        dogId
                        }
                    }
                  `
            }) 
        })
        console.log('Fetch result for getting initial dogs: ', fetchResult)
            if (fetchResult.ok) {
                console.log('Get request received')
                const jsonData = await fetchResult.json()
                setTableData(jsonData.data.getData)
            }
            else
                console.log('Get request failed')
        }

        getTableData()

    }, [])

    const addDog = async (newData) => {
        const fetchResult = await fetch('/test/v1/graphql', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({
            query: `
                mutation muchacho($name: String!, $breed: String!, $age: Int!) {
                addDog(input: {name: $name, breed: $breed, age: $age}) {
                    dogId
                    name
                    breed
                    age
                  }
                }
              `,

              variables: {
                name: newData.name,
                age: newData.age,
                breed: newData.breed,
              },
            })})
            console.log('Fetch result for adding a dog: ', fetchResult)
            if(fetchResult.ok) {
                const resultJson = await fetchResult.json()
                setTableData([...tableData, resultJson.data.addDog])
                setAddModalDisplayed(false)
            }
            else {
                console.log('Error fetching new dog')
            }
    }

    const killDog = async (id) => {
        const fetchResult = await fetch('/test/v1/graphql', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({
            query: `
                mutation hastaLaVista($dogId: Int!) {
                    killDog(dogId: $dogId)
                }
              `,

              variables: {
                dogId: id,
              },
            })})

            console.log('Fetch result for removing dog: ', fetchResult)

            if(fetchResult.ok) {
                console.log('Dog removed')
                setTableData(tableData.filter( dogList => dogList.dogId !== id))
            }
            else
                console.log('Error removing dog')     
    }

    const changeDog = async (dogInfo) => {
        const fetchResult = await fetch('/test/v1/graphql', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({
            query: `
                mutation magicTrick($name: String!, $breed: String!, $age: Int!, $dogId: Int!) {
                changeDog(newData: {name: $name, breed: $breed, age: $age, dogId: $dogId}) {
                    dogId
                    name
                    breed
                    age
                  }
                }
              `,

              variables: {
                name: dogInfo.name,
                age: dogInfo.age,
                breed: dogInfo.breed,
                dogId: dogInfo.dogId,
              },
            })})
            console.log('Fetch result for modifying a dog: ', fetchResult)
            if(fetchResult.ok) { 
                const resultJson = await fetchResult.json()
                const arrayPos = tableData.map(e => e.dogId).indexOf(resultJson.data.changeDog.dogId)
                if(arrayPos > -1) {
                    tableData.splice(arrayPos, 1, resultJson.data.changeDog)
                    setChangeModalDisplayed(false)
                    console.log('Dog info changed')
                }
                else
                    console.log('Request received but failed to modify dog info')
            }
            else {
                console.log('Error modifying dog info')
            }    
    }


    return (
        /*
            I looked at the structure of data-q for a long time, trying to 
            figure out how the table is rendered so that I could copy the structure.
            Based upon that and my conversations with Matt and Kyle, my understanding is that
            each row is treated as an entity and can be broken up further into individual
            cells. I thought about trying to mimic it and break up my data similarly,
            but that seemed overly ambitious for such a small project.

            For the sake of simplicity, I used html elements to construct my table instead.
        */
        <div>
            <table>
                <thead>
                    <th className='iconPadding'></th>
                    <th className='tablePadding'>Dog ID Number</th>
                    <th className='tablePadding'>Name</th>
                    <th className='tablePadding'>Breed</th>
                    <th className='tablePadding'>Age</th>
                </thead>
                <tbody>
                    {tableData.map((val) => {
                        return (
                            <tr key={val.dogId}>
                                <FaTrashAlt color='#D2122E' onClick={ () => killDog(val.dogId) } />
                                <FaPencilAlt color='#318CE7' onClick={ () => {
                                    setChangeModalData(val) 
                                    setAddModalDisplayed(false)
                                    setChangeModalDisplayed(true)   
                                } }
                                />
                                <td>{val.dogId}</td>
                                <td>{val.name}</td>
                                <td>{val.breed}</td>
                                <td>{val.age}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='buttonHolder'>
                <Button 
                    variant='filled' 
                    fullWidth
                    onClick={ () => {
                        setChangeModalDisplayed(false) 
                        setAddModalDisplayed(true) 
                    }}
                    label='Add a row'
                    />
            </div>

            {/* addModalDisplayed ? <RowModal hideModal newDog /> : changeModalDisplayed ? 

            */}

            { addModalDisplayed &&
                <AddRowModal 
                    hideModal={ () => setAddModalDisplayed(false) } 
                    newDog={ (newData) => addDog(newData) } 
                /> 
            }
            
            { changeModalDisplayed &&
                <ChangeDogModal 
                    hideModal={ () => setChangeModalDisplayed(false) } 
                    modifyDog={ (modifiedData) => changeDog(modifiedData)} 
                    dogInfo={ changeModalData } 
                />
            }
        </div>
    )
}

export default Table