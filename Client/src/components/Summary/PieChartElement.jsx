import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import './PieChartElement.css'
function PieChartElement() {
  const data = [
    {
      priority: 3,
      value: 20,
      color: '#00DFA2'
    },
    {
      priority: 2,
      value: 20,
      color: '#FFD93D'
    },
    {
      priority: 1,
      value: 20,
      color: '#FF8989'
    },
    {
      priority: 0,
      value: 40,
      color: '#8B9198'
    },
  ];
  const RADIAN = Math.PI / 180;
  const pieChartWidth = window.innerWidth * 0.13;
  console.log(window);
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className='pie flex flex-col flex-1 my-7 mx-4 justify-around items-center rounded-xl bg-white'>
      <div className="pie__taskData mt-9 flex w-[80%] justify-around">
        <div className='flex space-x-9 justify-around items-center '>
          <div className='flex flex-col justify-center h-full'>
            <h1>Total</h1>
            <h1>Tasks</h1>
          </div>
          <div className='pie__taskData_count'>
            23
          </div>
        </div>
        <div className='flex justify-around'>
          <div className='flex flex-col justify-center h-full'>
            <h1>Completed</h1>
            <h1>Tasks</h1>
          </div>
          <div className='pie__taskData_count'>
            03
          </div>
        </div>
      </div>
      <div className="pie__element flex justify-center m-2">
        <ResponsiveContainer height={pieChartWidth} width={pieChartWidth}>
          <PieChart>
            <Pie data={data} dataKey={'value'}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={pieChartWidth*0.5} fill="#8884d8" >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='pie__priorityDetails'>
        <h1>
          <span className='inline-block w-4 h-4 bg-[#FF8989] rounded-full'></span>
          1st Priority
        </h1>
        <h1>
          <span className='inline-block w-4 h-4 bg-[#FFD93D] rounded-full'></span>
          2nd Priority
        </h1>
        <h1>
          <span className='inline-block w-4 h-4 bg-[#00DFA2] rounded-full'></span>
          3rd Priority
        </h1>
        <h1>
          <span className='inline-block w-4 h-4 bg-[#8B9198] rounded-full'></span>
          Incomplete
        </h1>
      </div>
    </div>
  )
}

export default PieChartElement