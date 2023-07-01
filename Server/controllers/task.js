import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const {
      userId,
      heading,
      description,
      from,
      to,
      date,
      priority
    } = req.body;
    const newTask = new Task({
      userId,
      heading,
      description,
      from,
      to,
      date,
      priority,
      completed:false,
      timeSpent:0,
    });
    await newTask.save();
    const tasklist = await Task.find({userId: userId});

    res.status(201).json(tasklist);

  } catch (error) {
    res.status(409).json({ error: error.message });
    
  }
  

}

export const updateTask = async (req, res) => {
  try {
    const {
      heading,
      description,
      from,
      to,
      date,
      priority,
    } = req.body;
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id,{
      heading:heading,
      description:description,
      from :from,
      to :to,
      date :date,
      priority :priority,
    },{ new : true});

    res.status(200).json(updatedTask);

  } catch (error) {
    res.status(404).json({ error: error.message });
    
  }
}

export const updateTaskDone = async (req, res) => {
  try {
    const {completed} = req.body;
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id ,{
      completed:completed,
    },{new: true});

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
    
  }
}

export const updateTaskTimer = async (req, res) => {
  try {
    const {timeSpent} = req.body;
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id ,{
      timeSpent:timeSpent,
    },{new: true});

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
    
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
    
  }
}

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasklist = await Task.find({userId: userId});
    res.status(200).json(tasklist);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}