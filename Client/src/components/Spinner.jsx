import React from 'react'
import { ReactComponent as LoadingSpinner} from '../assets/Infinity-1s-200px.svg'
function Spinner() {
  return (
    <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-50 bg-[#00000050]'>
      <LoadingSpinner/>
    </div>
  )
}

export default Spinner