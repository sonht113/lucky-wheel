import React, { useEffect, useState } from 'react'
import './App.css'
import { PRIZES } from '@/data/constant'
import { AiOutlineMenu } from 'react-icons/ai'
import { ListPrizeWon, LuckyWheel, Modal, WinningResult } from '@/components'
import dayjs, { Dayjs } from 'dayjs'
import { getTimeSpinLuckyWheel } from '@/utils/get-time-spin-lucky-wheel'
import { delayedApiCall } from '@/api'
import { ConfigModal, PrizeWon, StyleRotate, WinningResultType } from '@/types'

const ID = 'luckywheel'

const App: React.FC = () => {
  const [styleRotate, setStyleRotate] = useState<StyleRotate>({
    deg: 0,
    timingFunc: 'ease-in-out'
  })
  const [spinning, setSpinning] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(5)
  const [winningResult, setWinningResult] = useState<WinningResultType>({
    name: '',
    img: ''
  })
  const [listPrizeWon, setListPrizeWon] = useState<PrizeWon[]>([])
  const [time, setTime] = useState<Dayjs>()
  const [configModal, setConfigModal] = useState<ConfigModal>({
    openModal: false,
    typeModal: 'notify'
  })
  /**
   * State for case call api get prize on server
   * If use case random index, you should remove this useState
   */
  const [index, setIndex] = useState<number | null>(null)

  /**
   * Function to spin and call api get prize on server
   */
  const handleSpin = () => {
    if (countSpin > 0) {
      setSpinning(true)
      setTime(dayjs())
      delayedApiCall()
        .then((result: number) => {
          console.log('Returned result:', result)
          setIndex(result)
        })
        .catch((error) => {
          console.error('Caught error:', error)
        })
      setCountSpin((prevState) => prevState - 1)
      let d = styleRotate.deg
      d = d - 180
      setStyleRotate({ timingFunc: 'ease-in-out', deg: d })
    }
  }

  /**
   * Function for case random index prize in array prize at file constant
   */
  // const handleSpin = useCallback(() => {
  //   if (countSpin > 0) {
  //     setSpinning(true)
  //     setTime(dayjs())
  //     setCountSpin((prevState) => prevState - 1)
  //     const rand = randomIndex(PRIZES)
  //     if (rand == null) {
  //       return
  //     }
  //     let d = styleRotate.deg
  //     d = d + (360 - (d % 360)) + (360 * 10 - rand * (360 / PRIZES.length))
  //     setStyleRotate({timingFunc: 'ease-in-out', deg: d})
  //     setWinningResult({ name: PRIZES[rand].name, img: PRIZES[rand].img })
  //     setListPrizeWon([
  //       ...listPrizeWon,
  //       { name: PRIZES[rand].name, img: PRIZES[rand].img, time: dayjs().format('DD/MM/YYYY HH:mm:ss') }
  //     ])
  //     alertAfterTransitionEnd()
  //   }
  // }, [styleRotate])

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

  const handleContinue = () => {
    setConfigModal({ ...configModal, openModal: false })
    if (winningResult.name === 'Lượt chơi') setCountSpin((prevState) => prevState + 1)
  }

  const handleOpenListOfPrizeWon = () => {
    setConfigModal({
      openModal: true,
      typeModal: 'list'
    })
  }

  /**
   * useEffect for case call api get prize on server
   * If use handleSpin for case random index in array prize at file constant, you should remove this useEffect
   */
  useEffect(() => {
    if (index !== null) {
      let d = styleRotate.deg
      d = d + (360 - (d % 360)) + (360 * 10 - index * (360 / PRIZES.length))
      setStyleRotate({ deg: d, timingFunc: 'ease' })
      setWinningResult({ name: PRIZES[index].name, img: PRIZES[index].img })
      setListPrizeWon([
        ...listPrizeWon,
        { name: PRIZES[index].name, img: PRIZES[index].img, time: dayjs().format('DD/MM/YYYY HH:mm:ss') }
      ])
      alertAfterTransitionEnd()
      setIndex(null)
    }
  }, [index])

  useEffect(() => {
    if (!spinning && time) {
      console.log(getTimeSpinLuckyWheel(time, dayjs()))
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
      {/* <AiOutlineMenu
        onClick={handleOpenListOfPrizeWon}
        className={'icon-menu-list-prize-won text-[30px] fixed top-10 right-7 cursor-pointer'}
      /> */}

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
      <LuckyWheel id={ID} styleRotate={styleRotate} prizes={PRIZES} spinning={spinning} />
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
