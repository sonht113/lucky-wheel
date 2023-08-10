import React, { useState } from 'react'
import Circle from '@/components/wheel'

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false)

  const handleButtonClick = () => {
    setIsSpinning(!isSpinning)
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Circle isSpinning={isSpinning} />
      <button
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleButtonClick}
      >
        Start
      </button>
    </div>
  )
}

export default App
