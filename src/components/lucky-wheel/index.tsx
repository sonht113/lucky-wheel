import { memo, useEffect, useRef } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Logo } from '@/assets'
import './style.css'
import { COLORS } from '@/data/constant'

type Props = {
  /**
   * id of section tag
   */
  id: string

  /**
   * góc quay sau khi tìm ra kết quả phần thưởng để kim trỏ đúng vị trí phần thưởng
   */
  deg: number

  /**
   * Mảng các phần thưởng
   */
  prizes: { name: string; img: string; percentpage: number }[]
}

const LuckyWheel = ({ id, deg, prizes }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  /**
   * function to drawl lucky wheel with canvas
   * @param num is length of list prize
   */
  const drawWheel = (num: number, prizes: { name: string; img: string; percentpage: number }[]) => {
    const rotateDeg = 360 / num / 2 + 90
    const turnNum = 1 / num
    const html = []

    const ele = document.getElementById(id)
    const ulElementFirstRender = document.querySelector('.luckywheel-list')

    if (ulElementFirstRender) {
      ulElementFirstRender.remove()
    }
    if (ele) {
      const prizeItems = document.createElement('ul')
      const container = ele.querySelector('.luckywheel-container')
      const prizeList = [...prizes]

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
          html.push('transform' + ': rotate(' + i * turnNum + 'turn); ')
          html.push('width:' + ((100 / num) * 2 - 2) + '%;"')
          html.push('>')
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

  useEffect(() => {
    drawWheel(prizes.length, prizes)
  }, [prizes])

  return (
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
  )
}

export default memo(LuckyWheel)
