import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { PRIZES } from '@/data/constant'
import { AiOutlineMenu } from 'react-icons/ai'
import { ListPrizeWon, LuckyWheel, Modal, WinningResult } from '@/components'
import { randomIndex } from '@/utils/random-index-prize'
import dayjs, { Dayjs } from 'dayjs'
import { getTimeSpinLuckyWheel } from './utils/get-time-spin-lucky-wheel'

const ID = 'luckywheel'

const App: React.FC = () => {
  const [deg, setDeg] = useState<number>(0)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(5)
  const [winningResult, setWinningResult] = useState<{ name: string; img: string }>({
    name: '',
    img: ''
  })
  const [listPrizeWon, setListPrizeWon] = useState<
    {
      img: string
      name: string
      time: string
    }[]
  >([])
  const [time, setTime] = useState<Dayjs>()
  const [configModal, setConfigModal] = useState<{ openModal: boolean; typeModal: 'list' | 'notify' }>({
    openModal: false,
    typeModal: 'notify'
  })

  const handleSpin = useCallback(() => {
    if (countSpin > 0) {
      setSpinning(true)
      setTime(dayjs())
      setCountSpin((prevState) => prevState - 1)
      const rand = randomIndex(PRIZES)
      if (rand == null) {
        return
      }
      let d = deg
      d = d + (360 - (d % 360)) + (360 * 10 - rand * (360 / PRIZES.length))
      setDeg(d)
      setWinningResult({ name: PRIZES[rand].name, img: PRIZES[rand].img })
      setListPrizeWon([
        ...listPrizeWon,
        { name: PRIZES[rand].name, img: PRIZES[rand].img, time: dayjs().format('DD/MM/YYYY HH:mm:ss') }
      ])
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
            setConfigModal({ typeModal: 'notify', openModal: true })
            setSpinning(false)
          },
          false
        )
      }
    }
  }

  const handleContinue = useCallback(() => {
    setConfigModal({ ...configModal, openModal: false })
    if (winningResult.name === 'Lượt chơi') setCountSpin((prevState) => prevState + 1)
  }, [countSpin])

  const handleOpenListOfPrizeWon = () => {
    setConfigModal({
      openModal: true,
      typeModal: 'list'
    })
  }

  useEffect(() => {
    if (!spinning && time) {
      getTimeSpinLuckyWheel(time, dayjs())
    }
  }, [spinning])

  return (
    <div className='relative flex flex-col justify-center items-center'>
      <div
        onClick={handleOpenListOfPrizeWon}
        className='menu-list-prize-won fixed top-10 right-7 p-3 rounded-lg bg-[#1A2B57] text-white cursor-pointer'
      >
        Danh sách quà đã trúng thưởng
      </div>
      <AiOutlineMenu
        onClick={handleOpenListOfPrizeWon}
        className={'icon-menu-list-prize-won text-[30px] fixed top-10 right-7 cursor-pointer'}
      />

      <Modal
        close={() => {
          setConfigModal({
            typeModal: 'notify',
            openModal: false
          })
        }}
        className={configModal.openModal ? '' : 'invisible opacity-0 scale-0 transition'}
      >
        {configModal.typeModal === 'notify' ? (
          <WinningResult winningResult={winningResult} handleContinue={handleContinue} />
        ) : (
          <ListPrizeWon listPrizeWon={listPrizeWon} />
        )}
      </Modal>
      <LuckyWheel id={ID} deg={deg} prizes={PRIZES} spinning={spinning} />
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
