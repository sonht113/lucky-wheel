import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { PRIZES } from '@/data/constant'

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [deg, setDeg] = useState<number>(0)
  const [countSpin, setCountSpin] = useState<number>(5)

  const drawWheel = (num: number) => {
    const rotateDeg = 360 / num / 2 + 90
    const turnNum = 1 / num
    const html = []
    const id = 'luckywheel'
    const ele = document.getElementById(id)
    if (ele) {
      const prizeItems = document.createElement('ul')
      const container = ele.querySelector('.luckywheel-container')
      if (canvasRef.current && container) {
        const ctx = canvasRef.current.getContext('2d')!
        for (let i = 0; i < num; i++) {
          ctx.save()
          ctx.beginPath()
          ctx.translate(300, 300)
          ctx.moveTo(0, 0)
          ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180)
          ctx.arc(0, 0, 300, 0, (2 * Math.PI) / num, false) // Radius
          ctx.fillStyle = '#ffffff'
          ctx.fill()
          ctx.lineWidth = 1
          ctx.restore()
          var prizeList = PRIZES
          html.push('<li class="luckywheel-item"> <span style="')
          html.push('transform' + ': rotate(' + i * turnNum + 'turn)">')
          html.push(`<div style="border: 2px solid ${i % 2 === 0 ? 'blue' : 'yellow'}" class="section">`)
          html.push('<img src=' + prizeList[i].img + ' style="margin: 0 auto" />')
          html.push("<p id='curve' style='color: green; margin-top: 5px'>" + prizeList[i].text + '</p>')
          html.push('</div></span> </li>')
        }
        prizeItems.className = 'luckywheel-list'
        container.appendChild(prizeItems)
        prizeItems.innerHTML = html.join('')
      }
    }
  }

  function randomIndex(prizes: { text: string; number: number; img: any; percentpage: number }[]) {
    const rand = Math.random()
    let prizeIndex = 0

    switch (true) {
      case rand < prizes[4].percentpage:
        prizeIndex = 4
        break
      case rand < prizes[4].percentpage + prizes[3].percentpage:
        prizeIndex = 3
        break
      case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
        prizeIndex = 2
        break
      case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage:
        prizeIndex = 1
        break
      case rand <
        prizes[4].percentpage +
          prizes[3].percentpage +
          prizes[2].percentpage +
          prizes[1].percentpage +
          prizes[0].percentpage:
        prizeIndex = 0
        break
    }
    return prizeIndex
  }

  const handleSpin = () => {
    if (countSpin > 0) {
      setCountSpin((prevState) => prevState - 1)
      const rand = randomIndex(PRIZES)
      if (rand == null) {
        return
      }
      let d = deg
      d = d + (360 - (d % 360)) + (360 * 10 - rand * (360 / PRIZES.length))
      setDeg(d)
    }
  }

  useLayoutEffect(() => {
    drawWheel(PRIZES.length)
  }, [])

  return (
    <React.Fragment>
      <div className='wrapper typo' id='wrapper'>
        <section id='luckywheel' className='luckywheel'>
          <div className='luckywheel-container' style={deg !== 0 ? { transform: `rotate(${deg}deg)` } : {}}>
            <canvas ref={canvasRef} className='luckywheel-canvas' width='600px' height='600px'>
              Vòng Xoay May Mắn
            </canvas>
          </div>
          <div className='luckywheel-btn'>
            <FaMapMarkerAlt className='text-[60px] text-cyan-700' />
          </div>

          <a className='luckywheel-logo'></a>
        </section>
      </div>
      <div className='flex justify-center mt-[70px]'>
        <button
          disabled={countSpin === 0}
          onClick={handleSpin}
          className={`py-2 ${
            countSpin === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          } px-5 w-[50%] rounded-lg bg-cyan-400 text-white font-bold`}
        >
          Quay
          <p className='font-light'>Còn {countSpin} lượt quay</p>
        </button>
      </div>
    </React.Fragment>
  )
}

export default App
