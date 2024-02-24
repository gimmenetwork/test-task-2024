import React from 'react'

const ValidationMessage = ({ isShown, id, text }) => {
  return (
    <p id={id} className={isShown ? 'instructions' : 'offscreen'}>
      <i className='ri-information-fill text-[22px]'></i>
      <small className='text-xs font-light'>{text}</small>
    </p>
  )
}

export default ValidationMessage
