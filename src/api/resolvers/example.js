const moment = require('moment')
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

module.exports = {
    Query: {
        getData() {
            return data
        }
    }
}