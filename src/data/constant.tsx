import { Nitro, Non, Ao, Miss, Vong, J2Logo } from '@/assets'

export const PRIZES = [
  {
    text: 'Áo',
    img: Ao,
    number: 1,
    percentpage: 0.01
  },
  {
    text: 'Nón',
    img: Non,
    number: 1,
    percentpage: 0.01 // 5%
  },
  {
    text: 'Vòng',
    img: Vong,
    number: 1,
    percentpage: 0.1 // 10%
  },
  {
    text: 'Security',
    img: J2Logo,
    number: 1,
    percentpage: 0.02 // 24%
  },
  {
    text: 'Good luck',
    img: Miss,
    number: 1,
    percentpage: 0.5 // 60%
  },
  {
    text: 'Nitro',
    img: Nitro,
    number: 1,
    percentpage: 0.24 // 24%
  },
  {
    text: 'Good luck',
    img: Miss,
    number: 1,
    percentpage: 0.8 // 60%
  },
  {
    text: 'Nitro',
    img: Nitro,
    percentpage: 0.2, // 60%
    number: 1
  }
]
