import { COLORS } from '@/data/constant'
import { Logo } from '@/assets'
import './style.css'

type Props = {
  winningResult: { name: string; img: string }
  handleContinue: () => void
}

const WinningResult = ({ winningResult, handleContinue }: Props) => {
  return (
    <div className='modal-container flex flex-col justify-center items-center gap-2 py-1 px-5 bg-white rounded-lg'>
      <img src={Logo} className='w-[30%]' />
      <span className='text-lg font-bold'>Chúc mừng</span>
      <span className='text-lg font-bold'>Phần thưởng của bạn là</span>
      <span className='text-lg font-bold text-[#C49B60]'>{winningResult.name}</span>
      <img src={winningResult.img} className='w-[25%] object-cover' />
      <div className='flex justify-around items-center xs:gap-5 md:gap-10 mb-3'>
        <button
          className={`px-10 xs:px-3 text-md xs:text-sm py-2 border-[1.5px] rounded-full border-[${COLORS.primary_first}] hover:border-[${COLORS.primary_second}] text-[${COLORS.primary_first}] hover:text-[${COLORS.primary_second}] transition-all ease-in-out duration-150`}
          onClick={handleContinue}
        >
          Trang chủ
        </button>
        <button
          className={`px-6 py-2 text-md xs:text-sm rounded-full bg-[${COLORS.primary_first}] text-white hover:bg-[${COLORS.primary_second}] transition-all ease-in-out duration-150`}
          onClick={handleContinue}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
}

export default WinningResult
