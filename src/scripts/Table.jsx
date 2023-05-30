import React, {useState, useEffect} from 'react'
import {queries, queryProfile} from '@monsantoit/profile-client'
import AddRowModal from './AddRowModal' //If using default export, no need for curly braces. If using named export, use curly braces.
import { async } from 'regenerator-runtime'

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
                console.log(jsonData)
                setData(jsonData.data.getData)
            }
            else
                console.log('Get request failed')
        }

        makeCall()

    }, [])


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
                    {data.map((val) => {
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