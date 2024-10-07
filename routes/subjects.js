const express = require("express");
const router = express.Router();
const subject = require("../models/subject");

router.post("/create/subject", async (req, res) => {
    try {
        const newSubject = new subject(req.body);
        await newSubject.save();

        res.status(201).json({
            success: true,
            data: newSubject,
            message: "Subject uploaded to database successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
            message: "Failed to upload subject to database",
        });
    }
});

router.get("/getAllSubjects", async (req, res) => {
    try {
        // Fetch all roll numbers from the Student collection
        const subjects = await subject.find({}, 'name'); // Only select the rollNumber field

        // Log the retrieved roll numbers for debugging
        console.log('Retrieved SubjectName:', subjects);

        // Respond with the list of roll numbers
        res.status(200).json({
            success: true,
            subjects: subjects.map(subject => subject.name),
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Failed to fetch subjects",
        });
    }
});

module.exports = router;
