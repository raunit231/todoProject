import React from 'react'

function QuickNoteElement() {
  return (
    <div className='quickNote flex-1  flex my-7 mx-4 flex-col items-center rounded-xl bg-white'>
      <h1 className='text-2xl font-[Lato] text-[#F47560] italic'>Quick Notes</h1>
      <hr className='w-[80%] border-red-400' />
      <div className='flex w-[80%] items-center text-xs py-2'>
        <textarea
          placeholder='Add a quick note...'
          rows={2}
          className='w-[80%] h-[50px] border border-gray-200  flex-1 rounded-lg p-2'
        />
      </div>
    </div>
  )
}

export default QuickNoteElement