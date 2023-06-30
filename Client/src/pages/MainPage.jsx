import React from 'react'
import './MainPage.css'
import Sidebar from '../components/Sidebar/Sidebar'
import TimelineBar from '../components/Timeline/Timeline'
import Summary from '../components/Summary/Summary'


function MainPage() {
  return (
    <div className='main'>
      <div className="main__sidebar">
        <Sidebar />
      </div>
      <div className="main__content">
        <div className="main__content_timeline">
          <TimelineBar />
        </div>
        <div className="main__content_summary">
          <Summary />
        </div>
      </div>
    </div>
  )
}

export default MainPage