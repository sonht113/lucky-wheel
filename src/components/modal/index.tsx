import React, { ReactElement } from 'react'

type Props = {
  children: ReactElement
  close?: () => void
  className?: string
}

const Modal = ({ children, close, className }: Props) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-50 z-10 transition ${className}`}>
      <div
        onClick={close}
        className='absolute top-3 right-3 bg-gray-400 rounded-full w-10 h-10 text-white flex justify-center items-center cursor-pointer'
      >
        X
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>{children}</div>
    </div>
  )
}

export default Modal
