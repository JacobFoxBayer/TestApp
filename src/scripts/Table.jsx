import React, {useState, useEffect} from 'react'
import {queries, queryProfile} from '@monsantoit/profile-client'
import { name } from 'file-loader'
import AddRowModal from './AddRowModal' //If using default export, no need for curly braces. If using named export, use curly braces.

/*

Left to do (off the top of my head):

    * Figure out why I get an infinite loop when trying to use an onClick event (I solved this, but would like an explanation)

    * Determine why the <addRowModal /> won't display even when the state variable is set
      to true (I solved this, no need for explanation)

    * Flesh out the addRowModal (if this is the route I continue to pursue. I could also rerender
      the entire screen based upon the status of the state variable)

    * Add a post request to the addRowModal and track the status of the request

    * Tests (?) and exception handling

    * Add typescript drivers and convert jsx to tsx (?)

*/

const Table = () => {

    // placeholder posts URL -- GET to https://jsonplaceholder.typicode.com/posts

    const [ pretendData, setPretendData ] = useState(null)
    const [ addRowModalDisplayed, setAddRowModalDisplayed ] = useState(false)

    useEffect(() => {
        const makeCall = async () => {
            // [{ userId: number, id: number, title: string, body: string }]
            const fetchResult = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' })
            if (fetchResult.ok) {
                console.log('Get request received')
                const jsonData = await fetchResult.json()
                setPretendData(jsonData)
            }
            else
                console.log('Get request failed')
        }

        makeCall()

    }, [])

    const data = [
        {
            dogId: 12345,
            name: 'Luna',
            breed: 'Poodle',
            age: 1,
        },

        {
            dogId: 12346,
            name: 'Stormy',
            breed: 'Lab/Beagle',
            age: 5,
        },

        {
            dogId: 12347,
            name: 'Bella',
            breed: 'Labrador Retriever',
            age: 7,
        }
    ]

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
                    <th>Dog ID Number</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={val.dogId}>
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
            { addRowModalDisplayed && //I've come to understand that this functions as basically an if statement for html. Is that accurate?
                <AddRowModal hideModal={ () => setAddRowModalDisplayed(false) } />
            }
        </div>
    )
}

export default Table