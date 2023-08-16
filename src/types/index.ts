export type ConfigModal = {
  openModal: boolean
  typeModal: 'list' | 'notify'
}

export type PrizeWon = {
  name: string
  img: string
  time: string
}

export type WinningResultType = {
  name: string
  img: string
}

export type StyleRotate = {
  deg: number
  timingFunc: 'ease-in-out' | 'ease'
}
