import { COLORS } from '@/data/constant'
import { Logo } from '@/assets'

type Props = {
  winningResult: { name: string; img: string }
  handleContinue: () => void
}

const WinningResult = ({ winningResult, handleContinue }: Props) => {
  return (
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
  )
}

export default WinningResult
