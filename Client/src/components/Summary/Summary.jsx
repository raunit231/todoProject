import React from 'react'
import QuickNoteElement from './QuickNoteElement'
import PieChartElement from './PieChartElement'
import TimerDetailsElement from './TimerDetailsElement'
import './Summary.css'
function Summary() {
  return (
    <div className='summary'>
      <div className="summary__quickNote">
        <QuickNoteElement/>
      </div>
      <div className="summary__pieChart">
        <PieChartElement/>
      </div>
      <div className="summary__timerDetails">
        <TimerDetailsElement/>
      </div>
      
    </div>
  )
}

export default Summary