import { memo } from 'react'
import './style.css'

type Props = {
  listPrizeWon: { name: string; img: string; time: string }[]
}

const ListPrizeWon = ({ listPrizeWon }: Props) => {
  return (
    <div className='list-prize-won-container flex flex-col gap-3 py-8 px-5 bg-white rounded-lg'>
      <p className='text-lg font-bold mb-5'>Danh sách phần quà đã trúng thưởng</p>
      <div className={`list-prize-won ${listPrizeWon.length === 0 ? 'h-[200px]' : 'h-[400px]'} overflow-auto`}>
        {listPrizeWon.length === 0 && <p className='text-center'>Bạn chưa trúng phần quà nào</p>}
        {listPrizeWon.length !== 0 && (
          <table className='table-fixed border-[5px] p-2 rounded-lg '>
            <thead>
              <tr>
                <th className=' w-[10%]'>Ảnh</th>
                <th className='w-[45%]'>Tên</th>
                <th className='w-[45%] text-right'>Thời điểm trúng thưởng</th>
              </tr>
            </thead>
            <tbody className='mt-5'>
              {listPrizeWon.map((prize) => (
                <tr>
                  <td>
                    <img className='w-[50%] xs:w-[100%] py-2 mx-auto' src={prize.img} />
                  </td>
                  <td className='text-center px-10 py-2'>{prize.name}</td>
                  <td className='text-right py-2'>{prize.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default memo(ListPrizeWon)
