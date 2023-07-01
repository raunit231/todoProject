import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  heading:{
    type:String,
    default:"",
  },
  description:{
    type:String,
    default:"",
  },
  from:{
    type:Date,
    default:Date.now(),
  },
  to:{
    type:Date,
    default:Date.now(),
  },
  date:{
    type:Date,
    default:Date.now(),
  },
  priority:{
    type:Number,
    default:3,
  },
  completed:{
    type:Boolean,
    default:false,
  },
  timeSpent:{
    type:Number,
    default:0,
  }
});

const Task = mongoose.model("Task",taskSchema);
export default Task;