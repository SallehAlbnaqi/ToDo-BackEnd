const tasksModel= require("../../db/models/tasksModel")


const getTasks = async (req,res)=>{
  const id = req.params.id;
  const user = req.token.userId


    try {
         const tasks = await tasksModel.find({ user: user,}).populate("user");
        res.status(200).json(tasks)
    } catch (error){
        res.send(error)
    }
}

const postTask = async (req, res)=>{
    const { newName, newTask , newCheck } = req.body;
    const id = req.params.id;
    const user = req.token.userId
    const newTa = new tasksModel({
      name:newName, 
    task:newTask,
    check:newCheck,
      user,
    })
    try {
        const savedTask = await newTa.save()
         const tasks = await tasksModel.find({user:user}).populate("user");
        res.status(200).json(tasks)

    }catch (error){
        res.send(error)
    }
}


const deleteTask = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const del = await tasksModel.findOneAndDelete({ _id: id, user: user });

    res.status(200).json([del , "deleted"]);
  } catch (err) {
    res.send(err , "err");
  }
};

const checked = async (req , res)=>{
  const id = req.params.id;
  const { check } = req.body




try{
  
  const ch = await tasksModel.findByIdAndUpdate({_id:id } , {check: check } , {new: false})
  const checkedTask = await ch.save()
  res.status(200).json(ch)

}catch (err) {
  res.send("error")
}
}

module.exports = { getTasks, postTask, deleteTask , checked };