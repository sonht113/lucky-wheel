import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import './typo.css'
import { GiArrowCursor } from 'react-icons/gi'
import html2canvas from 'html2canvas'
import ReactDOM from 'react-dom'

const slices = [
  { color: '#FF5733', label: 'Slice 1' },
  { color: '#FFC300', label: 'Slice 2' },
  { color: '#33FF57', label: 'Slice 3' },
  { color: '#337CFF', label: 'Slice 4' },
  { color: '#8B33FF', label: 'Slice 5' },
  { color: '#FF33E9', label: 'Slice 6' },
  { color: '#337CFF', label: 'Slice 7' },
  { color: '#8B33FF', label: 'Slice 8' }
]

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null)
  const [spinning, setSpinning] = useState(false)

  // const handleSpin = () => {
  //   if (!spinning && canvasRef.current) {
  //     setSpinning(true)
  //     const randomIndex = Math.floor(Math.random() * slices.length)
  //     const degrees = randomIndex * (360 / slices.length) + 1800 // Spin multiple rounds

  //     const startDeg = 0
  //     const targetDeg = degrees

  //     const ctx = canvasRef.current.getContext('2d')!
  //     const totalFrames = 120
  //     let currentFrame = 0
  //     const initialSpeed = 5 // Speed in degrees per frame
  //     const spinInterval = 50 // Milliseconds between frames
  //     const easingFactor = 0.1 // Easing factor for cubic easing function

  //     const spinIntervalId = setInterval(() => {
  //       const progress = currentFrame / totalFrames
  //       const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic easing function

  //       if (currentFrame === totalFrames) {
  //         clearInterval(spinIntervalId)
  //         setSpinning(false)
  //         setSelectedSlice(randomIndex)
  //       } else {
  //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //         const rotation = startDeg + (targetDeg - startDeg) * easedProgress
  //         drawWheel(ctx, rotation)
  //         currentFrame++
  //       }
  //     }, spinInterval)
  //   }
  // }

  // const drawWheel = async (ctx: CanvasRenderingContext2D, rotation: number) => {
  //   const centerX = canvasRef.current!.width / 2
  //   const centerY = canvasRef.current!.height / 2
  //   const radius = Math.min(centerX, centerY) - 20

  //   ctx.translate(250, 250)
  //   ctx.rotate(rotation)

  //   slices.forEach(async (slice, index) => {
  //     const startAngle = index * (360 / slices.length) * (Math.PI / 180)
  //     const endAngle = (index + 1) * (360 / slices.length) * (Math.PI / 180)

  //     ctx.beginPath()
  //     ctx.moveTo(0, 0)
  //     ctx.arc(0, 0, radius, startAngle, endAngle, false)
  //     ctx.fillStyle = slice.color
  //     ctx.fill()

  //     ctx.save()
  //     ctx.rotate((startAngle + endAngle) / 2)
  //     ctx.fillStyle = 'red'
  //     ctx.font = '18px sans-serif'
  //     ctx.textAlign = 'center'
  //     ctx.textBaseline = 'middle'
  //     ctx.fillText(slice.label, radius / 2, 0)
  //     ctx.fill
  //     ctx.restore()
  //   })

  //   ctx.rotate(-rotation)
  //   ctx.translate(-centerX, -centerY)
  // }

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const ctx = canvasRef.current.getContext('2d')!
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //     drawWheel(ctx, 0)
  //   }
  // }, [canvasRef])

  return (
    // <div>
    //   <div className='App'>
    //     <canvas
    //       className={`wheel-canvas ${spinning ? 'spinning' : ''}`}
    //       ref={canvasRef}
    //       width={'500px'}
    //       height={'500px'}
    //     />
    //     <a className='hc-luckywheel-btn' />
    //     <a className='hc-luckywheel-center' />
    //   </div>
    //   <div className='flex flex-col justify-center items-center'>
    //     <button className='spin-button' onClick={handleSpin} disabled={spinning}>
    //       Spin the Wheel
    //     </button>
    //     {selectedSlice !== null && (
    //       <div className='result-popup'>Congratulations! You landed on: {slices[selectedSlice].label}</div>
    //     )}
    //   </div>
    // </div>
    <div className='wrapper typo' id='wrapper'>
      <section id='luckywheel' className='hc-luckywheel'>
        <div className='hc-luckywheel-container'>
          <canvas className='hc-luckywheel-canvas' width='500px' height='500px'>
            Vòng Xoay May Mắn
          </canvas>
        </div>
        <a className='hc-luckywheel-btn'>Xoay</a>
      </section>
    </div>
  )
}

export default App
