import React, { useEffect, useState } from 'react'
import './App.css'
import { PRIZES } from '@/data/constant'
import { AiOutlineMenu } from 'react-icons/ai'
import { ListPrizeWon, LuckyWheel, Modal, WinningResult } from '@/components'
import dayjs, { Dayjs } from 'dayjs'
import { getTimeDifference } from '@/utils/get-time-difference'
import { delayedApiCall } from '@/api'
import { ConfigModal, PrizeWon, StyleRotate, WinningResultType } from '@/types'

const ID = 'luckywheel'
const CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE = 12
const CURRENT_TIME_DURATION_NEEDLE_ROTATE = 0.6

const App: React.FC = () => {
  const [styleRotate, setStyleRotate] = useState<StyleRotate>({
    deg: 0,
    timingFunc: 'ease-in-out',
    timeDuration: 0
  })
  const [spinning, setSpinning] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(10)
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
  const [timeNeedleRotate, setTimeNeedleRotate] = useState<number>(0)
  /**
   * State for case call api get prize on server
   * If use case random index, you should remove this useState
   */
  const [indexPrizeWon, setIndexPrizeWon] = useState<number | null>(null)

  /**
   * Function to spin and call api get prize on server
   */
  const handleSpin = () => {
    if (countSpin > 0) {
      setSpinning(true)
      setTime(dayjs())
      delayedApiCall()
        .then((result: number) => {
          setIndexPrizeWon(result)
        })
        .catch((error) => {
          console.error('Caught error:', error)
        })
      setCountSpin((prevState) => prevState - 1)
      let d = styleRotate.deg
      d = d + (360 - (d % 360)) + 360 * 10
      setStyleRotate({ timingFunc: 'ease-in-out', deg: d, timeDuration: CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE })
      setTimeNeedleRotate(CURRENT_TIME_DURATION_NEEDLE_ROTATE)
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
  //     setStyleRotate({timingFunc: 'ease-in-out', deg: d, timeDuration: CURRENT_TIME_DURATION_ROTATE})
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
   * If you use function handleSpin for case random index in array prize at file constant,
   * you should remove or comment this useEffect
   */
  useEffect(() => {
    if (indexPrizeWon !== null && time) {
      const timeCallApi = getTimeDifference(time, dayjs())
      let d = styleRotate.deg
      d = d + (360 - (d % 360)) + (360 * 10 - indexPrizeWon * (360 / PRIZES.length))
      const timeRotate = CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE - timeCallApi
      setStyleRotate({
        deg: d,
        timingFunc: 'ease',
        timeDuration: timeRotate
      })
      setTimeNeedleRotate(((timeRotate / 10) * 1) / 4)

      /**
       * Giảm tốc độ của kim sau khoảng thời gian tốc độ lucky wheel quay với gia tốc đều time = (timeRotate / 10) * 3 / 4) * 10000
       */
      setTimeout(() => {
        setTimeNeedleRotate((timeRotate / 10) * 3 / 4)
      }, ((timeRotate / 10) * 3 / 4) * 10000)

      setWinningResult({ name: PRIZES[indexPrizeWon].name, img: PRIZES[indexPrizeWon].img })
      setListPrizeWon([
        ...listPrizeWon,
        {
          name: PRIZES[indexPrizeWon].name,
          img: PRIZES[indexPrizeWon].img,
          time: dayjs().format('DD/MM/YYYY HH:mm:ss')
        }
      ])
      alertAfterTransitionEnd()
      setIndexPrizeWon(null)
    }
  }, [indexPrizeWon])

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
      <LuckyWheel
        id={ID}
        styleRotate={styleRotate}
        prizes={PRIZES}
        spinning={spinning}
        timeNeedleRotate={timeNeedleRotate}
      />
      <div className='flex justify-center mt-[70px] w-[50%]'>
        <button
          disabled={countSpin === 0 || spinning}
          onClick={handleSpin}
          className={`py-2 ${
            countSpin === 0 || spinning ? 'cursor-not-allowed' : 'cursor-pointer'
          } px-5 w-[100%] rounded-lg bg-[#1A2B57] text-white font-bold`}
        >
          {spinning ? 'Đang quay' : 'Quay'}
          <p className='font-light'>{countSpin > 0 ? `Còn ${countSpin} lượt quay` : 'Bạn đã hết lượt quay'}</p>
        </button>
      </div>
    </div>
  )
}

export default App
