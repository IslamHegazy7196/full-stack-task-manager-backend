const readFile = require("../utils/read");
const write = require("../utils/write");

const getAllTasks = async (req, res) => {
  try {
    const data = readFile();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const createTask = async (req, res) => {
  try {
    const read = readFile();
    const task = {
      ...req.body,
      id: new Date().getTime().toString(),
    };
    const newarray = [...read, task];
    const writeFile = write(newarray);
    res.status(200).send("Task created");
  } catch (error) {
    res.status(400).send(error);
  }
};

const clearAllTasks = async (req, res, next) => {
  const newarray = [];
  const writeFile = write(newarray);
  res.status(200).send("Tasks Cleared");
};

const deleteTask = async (req, res, next) => {
  try {
    const data = readFile();
    let isFound = false;
    let filtered = data.filter((task) => {
      isFound = task.id === req.params.id;
      return task.id != req.params.id;
    });

    const writeFile = write(filtered);
    res.status(200).send("delete Task");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const data = readFile();
    const id = req.params.id;
    let isFound = false;
    const title = req.body.title;
    const description = req.body.description;
    const newArr = data.map((task) => {
      if (task.id === id) {
        isFound = true;
        return { ...task, title, description };
      }
      return task;
    });
    if (isFound) {
      const writeFile = write(newArr);
      res.send("update Task");
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  clearAllTasks,
  updateTask,
  deleteTask,
};
