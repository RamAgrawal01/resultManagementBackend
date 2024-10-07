const express = require("express");
const router = express.Router();
const student = require("../models/student"); // Ensure the correct import

// Debug: Log the imported Student model
// console.log("Imported Student model:", student);

router.post("/create/student", async (req, res) => {
    try {
        const Student = new student(req.body);
        await Student.save();

        res.status(201).json({
            success: true,
            data: Student,
            message: "Student uploaded to database successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
            message: "Internal server error",
        });
    }
});

//get students 
router.get("/getStudent/:rollNumber",async(req,res)=>{
    try{
        const Student = await student.findOne({rollNumber:req.params.rollNumber});

        if(!Student) return res.status(404).json({
            success : false,
            message : "Student not found!",
        })

        res.status(201).json({
            success : true,
            message : `Student with ${Student.rollNumber} is successfully find`,
            Student,
        })
    }catch(err) {
        res.status(400).json({
            status : false,
            message : `error is ${err.message}`

        })
    }
})

//get all students
router.get("/getAllRollNumber", async (req, res) => {
    try {
        // Fetch all roll numbers from the Student collection
        const students = await student.find({}, 'rollNumber'); // Only select the rollNumber field

        // Log the retrieved roll numbers for debugging
        console.log('Retrieved Roll Numbers:', students);

        // Respond with the list of roll numbers
        res.status(200).json({
            success: true,
            rollNumbers: students.map(student => student.rollNumber),
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Failed to fetch roll numbers",
        });
    }
});
module.exports = router;