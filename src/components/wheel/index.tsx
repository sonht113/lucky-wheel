import React, { useEffect, useMemo } from 'react'
import './index.css'
import './typo.css'

interface CircleProps {
  isSpinning: boolean
}

const isPercentage = true

const Wheel: React.FC<CircleProps> = () => {
  const prizes = useMemo(
    () => [
      {
        text: 'Áo thun J2Team',
        img: 'images/Ao.png',
        number: 1, // 1%,
        percentpage: 0.01 // 1%
      },
      {
        text: 'Nón J2 Team',
        img: 'images/Non.png',
        number: 1,
        percentpage: 0.05 // 5%
      },
      {
        text: 'Vòng Tay J2Team',
        img: 'images/Vong.png',
        number: 1,
        percentpage: 0.1 // 10%
      },
      {
        text: 'J2Team Security',
        img: 'images/j2_logo.png',
        number: 1,
        percentpage: 0.24 // 24%
      },
      {
        text: 'Chúc bạn may mắn lần sau',
        img: 'images/miss.png',
        percentpage: 0.6 // 60%
      },
      {
        text: 'J2Team Security',
        img: 'images/j2_logo.png',
        number: 1,
        percentpage: 0.24 // 24%
      },
      {
        text: 'Chúc bạn may mắn lần sau',
        img: 'images/miss.png',
        percentpage: 0.6 // 60%
      }
    ],
    []
  )
  let $: (arg0: any) => any,
    ele,
    container: { appendChild: (arg0: HTMLUListElement) => void; style: { [x: string]: string } },
    canvas,
    num: number,
    btn: any,
    deg = 0,
    fnGetPrize: (arg0: (data: any) => void) => void,
    fnGotBack: (arg0: null) => any,
    optsPrize: { chances: any; prizeId: any }

  const cssPrefix = ''
  let eventPrefix: any
  let cssSupport: {
    cssPrefix?: any
    transform?: any
    transitionEnd?: any
  } = {}

  /**
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  const normalizeEvent = (name: string) => {
    return eventPrefix ? eventPrefix + name : name.toLowerCase()
  }

  /**
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  const normalizeCss = (name: string) => {
    name = name.toLowerCase()
    return cssPrefix ? cssPrefix + name : name
  }

  cssSupport = {
    cssPrefix: cssPrefix,
    transform: normalizeCss('Transform'),
    transitionEnd: normalizeEvent('TransitionEnd')
  }

  var transform = cssSupport.transform
  var transitionEnd = cssSupport.transitionEnd

  // alert(transform);
  // alert(transitionEnd);

  // function init(opts: {
  //   getPrize: (arg0: (data: any) => void) => void
  //   gotBack: (arg0: null) => any
  //   config: (arg0: (data: any) => void) => void
  //   prizes: any
  //   id: string
  //   mode: string
  // }) {
  //   fnGetPrize = opts.getPrize
  //   fnGotBack = opts.gotBack
  //   opts.config(function (data) {
  //     prizes = opts.prizes = data
  //     num = prizes.length
  //     draw(opts)
  //   })
  //   //events()
  // }

  /**
   * @param  {String} id
   * @return {Object} HTML element
   */

  function draw(id: string, mode: string, prizes: any[]) {
    if (!id || num >>> 0 === 0) return

    const rotateDeg = 360 / num / 2 + 90
    let ctx
    const prizeItems = document.createElement('ul')
    const turnNum = 1 / num
    const html = []

    const ele = document.getElementById(id)
    const canvas: HTMLCanvasElement | null = document.querySelector('.hc-luckywheel-canvas')
    const container: HTMLElement | null = document.querySelector('.hc-luckywheel-container')

    ctx = canvas && canvas.getContext('2d')

    for (var i = 0; i < num; i++) {
      if (ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.translate(250, 250) // Center Point
        ctx.moveTo(0, 0)
        ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180)
        ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false) // Radius
        if (i % 2 == 0) {
          ctx.fillStyle = '#ffb820'
        } else {
          ctx.fillStyle = '#ffcb3f'
        }
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#e4370e'
        ctx.stroke()
        ctx.restore()
      }
      const prizeList = prizes
      html.push('<li class="hc-luckywheel-item"> <span style="')
      html.push(transform + ': rotate(' + i * turnNum + 'turn)">')
      if (mode == 'both') {
        html.push("<p id='curve'>" + prizeList[i].text + '</p>')
        html.push('<img src="' + prizeList[i].img + '" />')
      } else if (prizeList[i].img) {
        html.push('<img src="' + prizeList[i].img + '" />')
      } else {
        html.push('<p id="curve">' + prizeList[i].text + '</p>')
      }
      html.push('</span> </li>')
      if (i + 1 === num) {
        if (container) {
          prizeItems.className = 'hc-luckywheel-list'
          container.appendChild(prizeItems)
          prizeItems.innerHTML = html.join('')
        }
      }
    }
  }

  /**
   * @param  {String} msg [description]
   */
  function showMsg(msg: string) {
    alert(msg)
  }

  /**
   * @param  {[type]} deg [description]
   * @return {[type]}     [description]
   */
  function runRotate(deg: string | number) {
    // runInit();
    // setTimeout(function() {
    container.style[transform] = 'rotate(' + deg + 'deg)'
    // }, 10);
  }

  // const hcLuckywheel = {
  //   init: function (opts: {
  //     getPrize: (arg0: (data: any) => void) => void
  //     gotBack: (arg0: null) => any
  //     config: (arg0: (data: any) => void) => void
  //     prizes: any
  //     id: string
  //     mode: string
  //   }) {
  //     return init()
  //   }
  // }

  //window.hcLuckywheel === undefined && (window.hcLuckywheel = hcLuckywheel)

  // if (typeof define == 'function' && define.amd) {
  //   define('HellCat-Luckywheel', [], function () {
  //     return hcLuckywheel
  //   })
  // }

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => draw('luckywheel', 'both', prizes), false)
  }, [prizes])

  return (
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

export default Wheel
