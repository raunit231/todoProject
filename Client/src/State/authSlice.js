import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user:null,
  token:null,
  tasks: [],
  timerTask: null,
  isRunning: false,
  timerViewToggle: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state,action) => {
			state.user = action.payload.user;
      state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
      state.token = null;
      state.tasks = [];
      state.timerTask = null;
      state.isRunning = false;
      state.timerViewToggle = false;
		},
		setTasks: (state, action) => {
			state.tasks = action.payload.tasks;
      if (state.tasks.length) {
				state.tasks.sort((task1, task2) => {
					const startTime1 = new Date(task1.from);
					const startTime2 = new Date(task2.from);

					if (startTime1.getTime() >= startTime2.getTime()) {
						return 1;
					} else {
						return -1;
					}
				});
			}
		},
    setTask: (state,action) => {
      const updatedTasks = state.tasks.map((task) => {
        if(task._id === action.payload._id ) return action.payload.task;
        return task;
      })
      state.tasks = updatedTasks;
      if (state.tasks.length) {
				state.tasks.sort((task1, task2) => {
					const startTime1 = new Date(task1.from);
					const startTime2 = new Date(task2.from);

					if (startTime1.getTime() >= startTime2.getTime()) {
						return 1;
					} else {
						return -1;
					}
				});
			}
    },
    createTask: (state,action) => {
      state.tasks = [...state.tasks, action.payload.task];
      if (state.tasks.length) {
				state.tasks.sort((task1, task2) => {
					const startTime1 = new Date(task1.from);
					const startTime2 = new Date(task2.from);

					if (startTime1.getTime() >= startTime2.getTime()) {
						return 1;
					} else {
						return -1;
					}
				});
			}
    },
    deleteTask: (state,action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
      if (state.timerTask) {
				if (action.payload._id === state.timerTask._id) state.timerTask = null;
			}
    },
    setCompleted: (state,action) => {
      if(state.timerTask){
        if(action.payload._id === state.timerTask._id) state.timerTask = null;
      }
      state.tasks = state.tasks.map((task) => {
        if(task._id === action.payload._id ) {
          task.completed = action.payload.completed;
          return task;
        }
        return task;
      });
      state.timerViewToggle = true;
    },
    setTimerTask : (state,action) => {
      state.timerTask = action.payload.task;
    },
    updateTimer: (state) => {
      state.timerTask.timeSpent += 1;
    },
    setIsRunning: (state,action) => {
      state.isRunning = action.payload.isRunning;
    },
    setTimerViewToggle: (state,action) => {
      state.timerViewToggle = action.payload.toggle;
    },
    sortTasks: (state) => {
      if(state.tasks.length){
        state.tasks.sort((task1,task2)=> {
          
            const startTime1 = new Date(task1.from);
            const startTime2 = new Date(task2.from);

            if(startTime1.getTime()>= startTime2.getTime()){
              return 1;
            } else {
              return -1;
            }
          
        })
      }
    },
    setQuickNote: (state,action) => {
      state.user.quickNote = action.payload.quickNote;
    }
	},
});

export const { setLogin, setLogout, setTasks, setTask, createTask, deleteTask, setCompleted, setTimerTask , updateTimer, setIsRunning, setTimerViewToggle,sortTasks ,setQuickNote} = authSlice.actions;

export default authSlice.reducer;
