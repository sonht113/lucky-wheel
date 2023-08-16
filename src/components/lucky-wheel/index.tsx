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
   * Css cho bánh xe khi quay
   * deg: góc quay sau khi tìm ra kết quả phần thưởng để kim trỏ đúng vị trí phần thưởng
   * timingFunc: tốc độ quay và độ mượt cho bánh xe
   */
  styleRotate: {
    deg: number
    timingFunc: string
  }

  /**
   * Check vòng quay có đang quay
   */
  spinning: boolean

  /**
   * Mảng các phần thưởng
   */
  prizes: { name: string; img: string; percentpage: number }[]
}

const LuckyWheel = ({ id, styleRotate, prizes, spinning }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)

  /**
   * function to drawl lucky wheel with canvas
   * @param prizes is list prize
   */
  const drawWheel = (prizes: { name: string; img: string; percentpage: number }[]) => {
    const num = prizes.length
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
          ctx.translate(250, 250) // Center Point
          ctx.moveTo(0, 0)
          ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180)
          ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false) // Radius
          if (i % 2 == 0) {
            ctx.fillStyle = '#e9a91f'
          } else {
            ctx.fillStyle = '#f6cc59'
          }
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = '#e72e04'
          ctx.stroke()
          ctx.restore()

          const htmlString = `<li class="luckywheel-item"><span style="transform: rotate(${i * turnNum}turn); width: ${
            (100 / num) * 2 - 2
          }%"><div style="border: 1.5px solid ${
            i % 2 === 0 ? COLORS.primary_first : COLORS.primary_second
          }" class="luckywheel-item__content"><img src="${
            prizeList[i].img
          }" style="margin: 0 auto" /><div class="text-container"><p class="name-prize" style="color: ${
            COLORS.primary_second
          }; margin-top: 5px">${prizeList[i].name}</p></div></div></span></li>`

          html.push(htmlString)
        }
        prizeItems.className = 'luckywheel-list'
        container.appendChild(prizeItems)
        prizeItems.innerHTML = html.join('')
      }
    }
  }

  // function rotateArrow() {
  //   if (arrowRef.current) {
  //     arrowRef.current.style.animation = `rotate 0.8s linear infinite`
  //     arrowRef.current.style.transitionTimingFunction = 'ease in out'
  //     arrowRef.current.style.transitionDuration = '6s'
  //   }
  //   requestAnimationFrame(() => rotateArrow())
  // }

  // console.log(deg)

  // useEffect(() => {
  //   if (spinning) {
  //     rotateArrow()
  //   }
  // }, [spinning, arrowRef])

  useEffect(() => {
    drawWheel(prizes)
  }, [prizes])

  return (
    <div className='wrapper sm:w-[300px] md:w-[600px]' id='wrapper'>
      <section id='luckywheel' className='luckywheel'>
        <div
          className='luckywheel-container'
          style={
            styleRotate.deg !== 0
              ? {
                  transform: `rotate(${styleRotate.deg}deg)`,
                  transitionTimingFunction: styleRotate.timingFunc,
                  transitionDuration: '6s'
                }
              : {}
          }
        >
          <canvas ref={canvasRef} className='luckywheel-canvas' width={'500px'} height={'500px'} />
        </div>
        <div className='luckywheel-btn' ref={arrowRef}>
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
