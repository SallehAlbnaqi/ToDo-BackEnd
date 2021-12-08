const express = require("express");
const tasksModel = express.Router();
const {authentication} = require("../middleware/authentication")
const { getTasks, postTask, deleteTask , checked} = require("../controllers/tasks");

tasksModel.get("/tasks/:id",authentication,getTasks);
tasksModel.post("/task/:id" ,authentication,postTask);
tasksModel.delete("/task/:id",authentication ,deleteTask);
tasksModel.put("/task/:id" , authentication ,checked )

module.exports = tasksModel;
