import React, { useEffect, useRef, useState } from 'react'
import './Timeline.css'

function TimelineBar() {
  const taskDetails = [
    {
      heading: 'Coding',
      description: 'codeforces contest review',
      from: '9',
      to: '10'
    },
    {
      heading: 'Coding',
      description: 'codeforces contest review',
      from: '7',
      to: '7.5'
    },
    {
      heading: 'Coding',
      description: 'codeforces contest review',
      from: '13',
      to: '15'
    },
  ]
  const timelineRef = useRef(null);
  const [hourWidth, setHourWidth] = useState(0);
  useEffect(() => {
    const timeline = timelineRef.current;
    const hourWidth = timeline.clientWidth / 6;
    setHourWidth(hourWidth);
  }, []);
  const HourStripe = ({ hourWidth }) => {
    const hours = Array.from({ length: 25 }, (_, i) => i);
    return (
      (<div className='hourStripe' >
        <div className="hourStripe__inner" style={{ width: `${hourWidth * 25}px` }}>
          {hours.map((hour) => {
            let hourTag;
            if (hour !== 0 && hour !== 12) hourTag = hour > 11 ? `${hour - 12} PM` : `${hour} AM`;
            else hourTag = hour === 0 ? '12 AM' : '12 PM';
            return (
              <div className={`hourStripe__item `} key={hour} style={{ width: `${hourWidth}px` }}>
                {hourTag}
              </div>
            )
          }
          )}
        </div>
      </div>)
    )
  }

  const TimelineBlockItem = ({ heading, description, from, to }) => {
    const duration= to-from;
    const currentHour = 13;
    return (
    <div className={`timeline__block_inner_item ${from == currentHour ? 'active':''}`} style={{width:`${duration*hourWidth}px`,left:`${from*hourWidth}px`}}>
      <h1>{heading}</h1>
      <h2>{description}</h2>
    </div>)
  }
  return (
    <div ref={timelineRef} className='timeline h-full'>
      <div className="timelineScroll">
        <div className="timeline__block">
          <div className="timeline__block_inner" style={{ width: `${hourWidth * 25}px` }}>
            {taskDetails.map(({ heading, description, from, to }) =>{
              return <TimelineBlockItem heading={heading} description={description} from={from} to={to} />
            })}
            <div className="bottom-0 left-[8%] absolute w-[8%] timeline__block_inner_item"></div>
          </div>
        </div>
        <HourStripe hourWidth={hourWidth} />
      </div>
    </div>
  )
}

export default TimelineBar