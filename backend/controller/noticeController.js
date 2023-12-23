const Notice = require("../model/notice");

// Create a notice
exports.createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new notice
    const newNotice = new Notice({
      title,
      content,
    });

    // Save the notice to the database
    await newNotice.save();

    res
      .status(201)
      .json({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all notices
exports.getAllNotices = async (req, res) => {
  try {
    // Retrieve all notices from the database
    const notices = await Notice.find();

    res.status(200).json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
