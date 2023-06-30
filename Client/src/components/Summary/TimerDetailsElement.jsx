import React, { useState } from 'react'
import './TimerDetailsElement.css'
import TaskElement from '../Sidebar/TaskElement'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
function TimerDetailsElement() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className='my-7 mx-4 flex-1 items-center flex flex-col overflow-hidden'>
      <div className={`allcompleted_task py-5 rounded-xl bg-white ${toggle ? 'flex-1':''}`}>
        <h1 className='text-center flex items-center'><span className='flex-1'>All Completed Tasks</span> <span className={`px-2 ${toggle ? '':'-rotate-90'}`}><IconButton onClick={() => setToggle(!toggle)}><ExpandMoreIcon/></IconButton></span></h1>
       {toggle && <div className="allcompleted_task_list">
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
          <TaskElement taskTitle={'Studing coding resources'} />
        </div>}
      </div>
      <div className={`timer ${toggle ? '':'flex-1'}`}>
        <div>
          <div>
            <div>Heading</div>
            <div>0:36:60</div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TimerDetailsElement