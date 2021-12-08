const express = require("express");
const app = express();
require("./db/db.js");
const courseModel= require("./db/models/tasksModel")
const cors = require("cors")
app.use(express.json());
app.use(cors())



//Endpoints with db
app.get("/", (req, res) => {
  res.status(200).json("hello from my app");
});

app.get("/courses",async (req,res)=>{
    try {
         const courses = await courseModel.find({});
        res.status(200).json(courses)
    } catch (error){
        res.send(error)
    }
   

})

app.post("/course",async (req, res)=>{
    const { newName, newDescription, newImg } = req.body;
    const newCourse = new courseModel({name:newName, description:newDescription, img:newImg})
    try {
        const savedCourse = await newCourse.save()
         const courses = await courseModel.find({});
        res.status(200).json(courses)

    }catch (error){
        res.send(error)
    }
})

app.delete("/course/:id",async (req,res)=>{
    const id= req.params.id;
    try {
    const course= await courseModel.findOneAndDelete({_id:id});
    res.status(200).json(course)
    } catch(error){
        res.send(error)
    }
})

//How to extract the callback function 
// const deleteCourse = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const course = await courseModel.findOneAndDelete({ _id: id });
//     res.status(200).json(course);
//   } catch (error) {
//     res.send(error);
//   }
// };
// app.delete("/course/:id", deleteCourse);

//endpoints without db
// app.get("/courses", (req, res) => {

//   res.status(200).json(courses);
// });
// app.post("/courses", (req, res) => {
//   const { newName, newDescription, newImg } = req.body;
//   const newCourse = { name: newName, description: newDescription, img: newImg };
//   courses.push(newCourse);
//   res.status(201).json(courses);
// });

// app.delete("/course/:index", (req, res) => {
//   const index = req.params.index;
//   // const { index } = req.params;
//   courses.splice(index, 1);
//   res.status(200).json(courses);
// });

//////////////
const Port = 5000;
app.listen(Port, () => {
  console.log("server is running");
});
