import React, { useCallback, useState } from 'react'
import './App.css'
import { PRIZES } from '@/data/constant'
import { LuckyWheel, Modal, WinningResult } from '@/components'
import { randomIndex } from '@/utils/randomIndexPrize'

const ID = 'luckywheel'

const App: React.FC = () => {
  const [deg, setDeg] = useState<number>(0)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(5)
  const [winningResult, setWinningResult] = useState<{ name: string; img: string }>({
    name: '',
    img: ''
  })
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleSpin = useCallback(() => {
    if (countSpin > 0) {
      setSpinning(true)
      setCountSpin((prevState) => prevState - 1)
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
  }, [deg])

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

  const handleContinue = useCallback(() => {
    setOpenModal(false)
    if (winningResult.name === 'Lượt chơi') setCountSpin((prevState) => prevState + 1)
  }, [countSpin])

  return (
    <div className='relative flex flex-col justify-center items-center'>
      <Modal close={() => setOpenModal(false)} className={openModal ? '' : 'invisible opacity-0 scale-0 transition'}>
        <WinningResult winningResult={winningResult} handleContinue={handleContinue} />
      </Modal>
      <LuckyWheel id={ID} deg={deg} prizes={PRIZES} />
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
