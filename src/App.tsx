import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { COLORS, PRIZES } from '@/data/constant'
import Modal from '@/components/modal'
import { Logo } from '@/assets'

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [deg, setDeg] = useState<number>(0)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(5)
  const [winningResult, setWinningResult] = useState<{ name: string; img: string }>({
    name: '',
    img: ''
  })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const ID = 'luckywheel'

  const drawWheel = (num: number) => {
    const rotateDeg = 360 / num / 2 + 90
    const turnNum = 1 / num
    const html = []

    const ele = document.getElementById(ID)
    if (ele) {
      const prizeItems = document.createElement('ul')
      const container = ele.querySelector('.luckywheel-container')
      let prizeList = PRIZES

      if (canvasRef.current && container) {
        const ctx = canvasRef.current.getContext('2d')!
        for (let i = 0; i < num; i++) {
          ctx.save()
          ctx.beginPath()
          ctx.translate(300, 300)
          ctx.moveTo(0, 0)
          ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180)
          ctx.arc(0, 0, 300, 0, (i * 2 * Math.PI) / num, false) // Radius
          ctx.fillStyle = '#ffffff'
          ctx.fill()
          ctx.lineWidth = 1
          ctx.restore()

          html.push('<li class="luckywheel-item"> <span style="')
          html.push('transform' + ': rotate(' + i * turnNum + 'turn)">')
          html.push(
            `<div style="border: 1.5px solid ${
              i % 2 === 0 ? COLORS.primary_first : COLORS.primary_second
            }" class="luckywheel-item__content">`
          )
          html.push('<img src=' + prizeList[i].img + ' style="margin: 0 auto" />')
          html.push(
            "<div class='text-container'><p class='name-prize' style='color:" +
              COLORS.primary_second +
              "; margin-top: 5px'>" +
              prizeList[i].name +
              '</div></p>'
          )
          html.push('</div></span></li>')
        }
        prizeItems.className = 'luckywheel-list'
        container.appendChild(prizeItems)
        prizeItems.innerHTML = html.join('')
      }
    }
  }

  function randomIndex(prizes: { name: string; img: any; percentpage: number }[]) {
    let winningPrizeIndex = 0

    // Mảng tỉ lệ tích luỹ qua các phần quà
    const cumulativeRatios: number[] = []
    let cumulativeRatio = 0

    for (const prize of prizes) {
      cumulativeRatio += prize.percentpage
      cumulativeRatios.push(cumulativeRatio)
    }

    // Tổng tỉ lệ tích luỹ qua tất cả phần quà
    const totalCumulativeRatio = cumulativeRatios[cumulativeRatios.length - 1]
    const randomValue = Math.random() * totalCumulativeRatio

    for (let i = 0; i < cumulativeRatios.length; i++) {
      if (randomValue <= cumulativeRatios[i]) {
        winningPrizeIndex = i
        break
      }
    }

    return winningPrizeIndex
  }

  const handleSpin = () => {
    if (countSpin > 0) {
      setCountSpin((prevState) => prevState - 1)
      setSpinning(true)
      const rand = randomIndex(PRIZES)
      if (rand == null) {
        return
      }
      let d = deg
      d = d + (360 - (d % 360)) + (360 * 10 - rand * (360 / PRIZES.length))
      setDeg(d)
      setWinningResult({ name: PRIZES[rand].name, img: PRIZES[rand].img })
      alertAfterTransitionEnd()
    }
  }

  const alertAfterTransitionEnd = () => {
    const ele = document.getElementById(ID)
    if (ele) {
      const container = ele.querySelector('.luckywheel-container')
      if (container) {
        container.addEventListener(
          'transitionend',
          () => {
            setOpenModal(true)
            setSpinning(false)
          },
          false
        )
      }
    }
  }

  const handleContinue = () => {
    setOpenModal(false)
    if (winningResult.name === 'Lượt chơi') setCountSpin((prevState) => prevState + 1)
  }

  useEffect(() => {
    drawWheel(PRIZES.length)
  }, [])

  return (
    <div className='relative flex flex-col justify-center items-center'>
      <Modal close={() => setOpenModal(false)} className={openModal ? '' : 'invisible opacity-0 scale-0 transition'}>
        <div className='flex flex-col justify-center items-center gap-3 py-8 px-5 bg-white rounded-lg'>
          <img src={Logo} className='w-[30%]' />
          <span className='text-xl font-bold'>Chúc mừng</span>
          <span className='text-xl font-bold'>Phần thưởng của bạn là</span>
          <span className='text-xl font-bold text-[#C49B60]'>{winningResult.name}</span>
          <img src={winningResult.img} className='w-[30%] object-cover' />
          <div className='flex justify-around items-center xs:gap-5 md:gap-10'>
            <button
              className={`px-10 py-2 border-2 rounded-full border-[${COLORS.primary_first}] hover:border-[${COLORS.primary_second}] text-[${COLORS.primary_first}] hover:text-[${COLORS.primary_second}] transition-all ease-in-out duration-150`}
              onClick={handleContinue}
            >
              Trang chủ
            </button>
            <button
              className={`px-14 py-2 rounded-full bg-[${COLORS.primary_first}] text-white hover:bg-[${COLORS.primary_second}] transition-all ease-in-out duration-150`}
              onClick={handleContinue}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </Modal>
      <div className='wrapper sm:w-[300px] md:w-[600px]' id='wrapper'>
        <section id='luckywheel' className='luckywheel'>
          <div className='luckywheel-container' style={deg !== 0 ? { transform: `rotate(${deg}deg)` } : {}}>
            <canvas ref={canvasRef} className='luckywheel-canvas' />
          </div>
          <div className='luckywheel-btn'>
            <FaMapMarkerAlt className='text-[60px] text-[#1A2B57]' />
          </div>

          <div className='luckywheel-logo border-2 border-[#1A2B57]'>
            <img src={Logo} className='p-2' />
          </div>
        </section>
      </div>
      <div className='flex justify-center mt-[70px] w-[30%]'>
        <button
          disabled={countSpin === 0 || spinning}
          onClick={handleSpin}
          className={`py-2 ${
            countSpin === 0 || spinning ? 'cursor-not-allowed' : 'cursor-pointer'
          } px-5 w-[100%] rounded-lg bg-[#1A2B57] text-white font-bold`}
        >
          Quay
          <p className='font-light'>Còn {countSpin} lượt quay</p>
        </button>
      </div>
    </div>
  )
}

export default App
