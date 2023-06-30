import React, { useState } from 'react'
import 'animate.css'
import "./Sidebar.css"
import TaskElement from './TaskElement'
function Sidebar() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const toggleExpand = (index) => {
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    }
  }
  return (
    <div className='sidebar my-8'>
      <div className={`sidebar__items '}`}>
        <div className='sidebar__items_title ' onClick={() => toggleExpand(0)}>TODAY</div>
        <div className={`overflow-hidden sidebar__items_container ${expandedIndex === 0 ? 'show' : ''}`}>
          {expandedIndex === 0 && <div className={`sidebar__items_tasklist`}>
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum."} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
          </div>
          }
        </div>
      </div>
      <div className="sidebar__items">
        <div className='sidebar__items_title' onClick={() => toggleExpand(1)}>THIS WEEK</div>
        <div className={` overflow-hidden sidebar__items_container ${expandedIndex === 1 ? 'show' : ''}`}>
          {expandedIndex === 1 && <div className="sidebar__items_tasklist">
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum."} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />

          </div>}
        </div>

      </div>
      <div className="sidebar__items">
        <div className='sidebar__items_title' onClick={() => toggleExpand(2)}>THIS MONTH</div>
        <div className={`overflow-hidden sidebar__items_container ${expandedIndex === 2 ? 'show' : ''}`}>
          {expandedIndex === 2 && <div className="sidebar__items_tasklist">
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum."} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
            <TaskElement taskTitle={'Heading'} taskDesc={"Culpa nostrud sint laborum deserunt nostrud laborum. "} />
          </div>}
        </div>

      </div>
      

    </div>
  )
}

export default Sidebar

// 
