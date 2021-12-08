const mongoose = require("mongoose");

const tasksModel = new mongoose.Schema({
  name: { type: String },
  task:  {type: Array } ,
  check : {type: Boolean},
  user:{type: mongoose.Schema.Types.ObjectId, ref:"userModel"}
});

module.exports = mongoose.model("tasksModel", tasksModel);
