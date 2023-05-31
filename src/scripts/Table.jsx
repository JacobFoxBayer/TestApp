import React, {useState, useEffect} from 'react'
import {queries, queryProfile} from '@monsantoit/profile-client'
import AddRowModal from './AddRowModal' //If using default export, no need for curly braces. If using named export, use curly braces.
import { async } from 'regenerator-runtime'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"

/*

Left to do (off the top of my head):

    * Flesh out the addRowModal

    * Add a post request to the addRowModal and track the status of the request

    * Tests (?) and exception handling

    * Add typescript drivers and convert jsx to tsx (?)

*/

const Table = () => {

    // placeholder posts URL -- GET to https://jsonplaceholder.typicode.com/posts

    const [ data, setData ] = useState([])
    const [ addRowModalDisplayed, setAddRowModalDisplayed ] = useState(false)

    useEffect(() => {
        const makeCall = async () => {
            // [{ userId: number, id: number, title: string, body: string }]
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
        console.log(fetchResult)
            if (fetchResult.ok) {
                console.log('Get request received')
                const jsonData = await fetchResult.json()
                setData(jsonData.data.getData)
            }
            else
                console.log('Get request failed')
        }

        makeCall()

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
            console.log(fetchResult)
            if(fetchResult.ok) {
                const resultJson = await fetchResult.json()
                setData([...data, resultJson.data.addDog])
                setAddRowModalDisplayed(false)
            }
            else {
                console.log('Error fetching new data')
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
                setData(data.filter( dogList => dogList.dogId !== id))
            }
            else
                console.log('Error removing dog')     
    }

    const changeDog = async (id) => {
        const fetchResult = await fetch('/test/v1/graphql', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({
            query: `
                mutation magicTrick($dogId: Int!) {
                    killDog(dogId: $dogId)
                }
              `,

              variables: {
                dogId: id,
              },
            })})

            console.log('Fetch result for removing dog: ', fetchResult)

            if(fetchResult.ok) {
                setData(data.filter( dogList => dogList.dogId !== id))
            }
            else
                console.log('Error removing dog')     
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
                    {data.map((val) => {
                        return (
                            <tr key={val.dogId}>
                                <FaTrashAlt onClick={ () => killDog(val.dogId) } />
                                <FaPencilAlt onClick={ () => changeDog(val)} />
                                <td>{val.dogId}</td>
                                <td>{val.name}</td>
                                <td>{val.breed}</td>
                                <td>{val.age}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={ () => setAddRowModalDisplayed(true) }>Add a row</button>
            { addRowModalDisplayed &&
                <AddRowModal hideModal={ () => setAddRowModalDisplayed(false) } newDog={ (newData) => addDog(newData) } />
            }
        </div>
    )
}

export default Table