function callApi(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 8) // Generate a random number
      resolve(randomNumber) // Resolve the promise with the random number
    }, 2000) // Simulate a delay of 1 second
  })
}

export async function delayedApiCall() {
  try {
    const result = await callApi() // Wait for the API call to complete
    console.log('API result:', result)
    return result // Return the result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
