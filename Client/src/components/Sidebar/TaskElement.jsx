import React, { useState } from 'react'
import "./TaskElement.css"
import { Checkbox, IconButton, Radio} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';


function TaskElement({ taskTitle, taskDesc  }) {
  const [expand, setExpand] = useState(false);
  const [checked, setChecked] = useState(false);
  const [taskTitleValue, setTaskTitleValue] = useState(taskTitle);
  const [taskDescValue, setTaskDescValue] = useState(taskDesc);
  const handleTaskChange = (e) => {
    setTaskTitleValue(e.target.value);
  }
  const handleExpand = () => {
    setExpand(true);
  }
  const handleDone = () => {
    setExpand(false);
  }
  const ColorRadioButtons = () => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'color-radio-button-demo',
      inputProps: { 'aria-label': item },
    });

    return (
      <div>
        <Radio
          {...controlProps('a')}
          sx={{
            color: '#FF8989',
            '&.Mui-checked': {
              color: '#FF8989',
            },
          }}
        />
        <Radio
          {...controlProps('b')}
          sx={{
            color: '#FFD93D',
            '&.Mui-checked': {
              color: '#FFD93D',
            },
          }}
        />
        <Radio
          {...controlProps('c')}
          sx={{
            color: '#00DFA2',
            '&.Mui-checked': {
              color: '#00DFA2',
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className={`task  flex flex-col my-2 ${expand ? 'task_editable' : ''}`} >
      <div className="task__heading space-x-1 hover:bg-gray-50" >
        <Checkbox className='w-[10%]' icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleOutlineIcon className='text-black' />} onChange={(e) => setChecked(e.target.checked)} checked={checked} />
        <div className="task__heading_title flex-1 flex items-center" onClick={handleExpand}>
          {expand ? <textarea
            placeholder='Task Title'
            autoFocus={true}
            value={taskTitleValue}
            onChange={handleTaskChange}
            rows={1}
          ></textarea> : <div className='ml-[9px] h-full'>{taskTitle}</div>}
        </div>
        {expand && <IconButton onClick={handleDone}>
          <DoneOutlinedIcon />
        </IconButton>}
      </div>
      <div className='task__expansion'>
        {expand &&
          <div className='task__expansion_menu'>
            <div className="task__expansion_desc mx-5">
              <h1 className='text-black text-left col-span-3' >Description:</h1>
              <textarea
                rows={4}
                placeholder='Task Description'
                value={taskDescValue}
                onChange={(e) => setTaskDescValue(e.target.value)}
              ></textarea>
            </div>
            <div className='m-2 container-grid-3'>
              <InsertLinkRoundedIcon />
              <input placeholder='Add link' type="url" className='outline-none mx-1 rounded-md p-1' />
            </div>
            <div className="task__expansion_menu_timer">
              <p className='flex justify-center items-center'>From</p>
              <div className='flex justify-center items-center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    defaultValue={dayjs()}
                  />
                </LocalizationProvider>
              </div>
              <div className='flex justify-center items-center'><IconButton><AvTimerIcon /></IconButton></div>
              <p className='flex justify-center items-center'>To</p>
              <div className='flex justify-center items-center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    defaultValue={dayjs()}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="task__expansion_menu_priority">
              <ColorRadioButtons />
            </div>
          </div>}
      </div>
    </div>
  )
}

export default TaskElement