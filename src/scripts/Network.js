export const addDogNetworkRequest = async (newData) => {
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
        return fetchResult
    }

export const killDogNetworkRequest = async (id) => {
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
      return fetchResult
    }

export const changeDogNetworkRequest = async (dogInfo) => {
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
      return fetchResult
    }

export const getTableDataNetworkRequest = async () => {
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
  return fetchResult
}