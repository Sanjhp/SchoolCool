const Help = require("../model/help");

// Create a notice
exports.help = async (req, res) => {
  try {
    const { title, content, schoolId, reply } = req.body;

    // Validate request data
    if (!title || !content || !schoolId) {
      return res
        .status(400)
        .json({ message: "Title, content, and schoolId are required fields." });
    }

    // Create a new Help instance
    const newHelp = new Help({
      title,
      content,
      schoolId,
      reply,
    });

    // Save the new help to the database
    const savedHelp = await newHelp.save();

    // Respond with the saved help
    res.status(201).json(savedHelp);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Update help reply
exports.updateHelpReply = async (req, res) => {
  try {
    const { reply } = req.body;

    // Validate request data
    if (!reply) {
      return res
        .status(400)
        .json({ message: "Reply is a required field for updating." });
    }

    // Find the help item by ID
    const help = await Help.findById(req.params.id);

    // Check if the help item exists
    if (!help) {
      return res.status(404).json({ message: "Help item not found." });
    }

    // Update the reply field
    help.reply = reply;

    // Save the updated help to the database
    const updatedHelp = await help.save();

    // Respond with the updated help
    res.json(updatedHelp);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
