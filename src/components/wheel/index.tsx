import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface CircleProps {
  isSpinning: boolean
}

const Wheel: React.FC<CircleProps> = ({ isSpinning }) => {
  const [spinningClass, setSpinningClass] = useState('')

  useEffect(() => {
    if (isSpinning) {
      setSpinningClass('animate-spin')
      setTimeout(() => {
        setSpinningClass('')
      }, 3000)
    }
  }, [isSpinning])

  return (
    <div>
      <div className={'relative w-[500px] h-[500px] border-[8px] border-red-500 rounded-full'}>
        <FaMapMarkerAlt
          style={{
            fontSize: '35px',
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translate(-50%)',
            color: 'blue',
            zIndex: 1111
          }}
        />
        <div className='absolute rotate-[710deg] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <div
            className={`relative bg-green-400 w-[460px] h-[460px] border-[8px] border-red-500 rounded-full ${spinningClass}`}
          >
            <FaMapMarkerAlt
              style={{
                fontSize: '20px',
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translate(-50%)',
                color: 'blue'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wheel
