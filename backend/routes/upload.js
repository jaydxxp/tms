const express = require("express");
const router = express.Router();
const upload = require("./uploadConfig");
const TaskSubmission = require("./models/TaskSubmission"); // Mongoose model

router.post("/submit-task", upload.single("file"), async (req, res) => {
  try {
    const { userId, taskId, status } = req.body;
    const originalName = req.file.originalname;

    // Save initial data to DB
    const submission = await TaskSubmission.create({
      userId,
      taskId,
      status,
      fileOriginalName: originalName,
      fileStoredName: "", // Will update later
    });

    // Rename file based on DB ID
    const fs = require("fs");
    const newFileName = `${submission._id}${path.extname(originalName)}`;
    const oldPath = `uploads/${req.file.filename}`;
    const newPath = `uploads/${newFileName}`;
    fs.renameSync(oldPath, newPath);

    // Update record with stored filename
    submission.fileStoredName = newFileName;
    await submission.save();

    res.status(200).json({ message: "Task submitted", submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});
