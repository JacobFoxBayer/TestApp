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
        },

        killDog(_,{dogId}) {
            console.log('1', dogId)
            const arrayPos = data.map(e => e.dogId).indexOf(dogId);
            console.log('2', arrayPos)
            if(arrayPos > -1) {
                data.splice(arrayPos, 1)
                return true
            }
            else
                return false
        } ,

        changeDog(_,{newData}) {
            
        }
    }
}