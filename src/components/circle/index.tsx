import React from 'react'
import './style.css' // Import your CSS file for styling

const numSegments = 8 // Number of segments
const radius = 150 // Radius of the circle
const center = radius + 10 // Distance from the top and left to center the circle

const CircleWithSegments: React.FC = () => {
  const angle = 360 / numSegments // Angle between each segment

  return (
    <div className='circle-with-segments'>
      <div className='circle'>
        {Array.from({ length: numSegments }).map((_, index) => (
          <div
            className={`segment segment-${index}`}
            key={index}
            style={{
              transform: `rotate(${angle * index}deg) translate(${radius}px) rotate(-${angle * index}deg)`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default CircleWithSegments
