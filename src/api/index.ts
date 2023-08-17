import { PRIZES } from '@/data/constant'

function callApi(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * PRIZES.length)
      resolve(randomNumber)
    }, 2000)
  })
}

export async function delayedApiCall() {
  try {
    const result = await callApi()
    console.log('API result:', result)
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
