const xlsx = require("xlsx");
const Company = require("../models/company"); // Assuming you have a Company model defined
const Contact = require("../models/contact"); // Assuming you have a Contact model defined

const validateMiddleware = async (req, res, next) => {
  try {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length !== 2) {
      return res.status(400).json({ message: "Please upload two files" });
    }

    // Access uploaded files (assuming file1 and file2 are the names in FormData)
    const file1 = req.files.file1;
    const file2 = req.files.file2;

    // Parse Excel files using xlsx
    const workbook1 = xlsx.readFile(file1.path);
    const workbook2 = xlsx.readFile(file2.path);

    // Assuming sheet names and data structure, modify as per your Excel files
    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

    // Convert Excel data to JSON format
    const data1 = xlsx.utils.sheet_to_json(sheet1);
    const data2 = xlsx.utils.sheet_to_json(sheet2);

    // Save data to MongoDB using Mongoose models
    await saveDataToMongoDB(data1, data2);

    // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error saving files to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Example function to save data to MongoDB using Mongoose models
const saveDataToMongoDB = async (data1, data2) => {
  try {
    // Save data to MongoDB using Mongoose models
    const savedData1 = await Company.create(data1); // Assuming Company model
    const savedData2 = await Contact.create(data2); // Assuming Contact model

    console.log("Data saved to MongoDB:", savedData1, savedData2);
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    throw error; // Throw error to be caught by middleware error handler
  }
};

module.exports = validateMiddleware;
