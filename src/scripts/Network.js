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