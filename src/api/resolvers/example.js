const moment = require('moment')
const data = [
    {
        dogId: 1,
        name: 'Luna',
        breed: 'Poodle',
        age: 1,
    },

    {
        dogId: 2,
        name: 'Stormy',
        breed: 'Lab/Beagle',
        age: 5,
    },

    {
        dogId: 3,
        name: 'Bella',
        breed: 'Labrador Retriever',
        age: 7,
    },
]

module.exports = {
    Query: {
        getData() {
            return data
        }
    },

    Mutation: {
        addDog(_,{input}) {
            console.log(input)
            const newDog = {
                ...input,
                dogId: data.length + 1
            }
            data.push(newDog)
            return newDog
        }
    }
}