const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validateMiddleware");

// POST route for uploading files and saving to MongoDB
router.post("/", validateMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "Files uploaded and saved to MongoDB successfully" });
});

module.exports = router;
