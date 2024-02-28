import React from 'react'

const BookListProgress = ({ pages, userbook }) => {
  let percentage = Math.trunc(
    ((Number(userbook[0].progress) - pages) / pages) * 100 + 100
  )

  return (
    <div
      className='h-[5px] rounded-full absolute -top-[3px] bg-accent transition-all duration-500'
      style={{ width: `${percentage}%` }}
    >
      <div
        className={`w-0 h-0 border-l-[10px] border-l-transparent border-t-[12px] border-t-${
          percentage > 0 ? 'accent' : '[#666666]'
        } border-r-[10px] border-r-transparent absolute top-[2px] left-3.5`}
      ></div>

      <div
        className={`absolute -top-[9px] px-2 py-1 ${
          percentage > 0 ? 'right' : 'left'
        }-0 rounded-full bg-accent text-[10px] text-white text-center`}
      >{`${percentage}%`}</div>
    </div>
  )
}

export default BookListProgress
