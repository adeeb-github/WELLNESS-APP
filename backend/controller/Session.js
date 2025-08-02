const Session = require("../Models/Session");

exports.createSession = async (req, res) => {
  try {
    const { title, tags, json_file_url, status } = req.body;
    const user_id = req.user.id;


    const newSession = await Session.create({
      user_id,
      title,
      tags,
      json_file_url,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: newSession,
    });
  } catch (error) {
    console.error("Create session error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
};

exports.getSessionData = async (req, res) => {
  try {
    // Only fetch sessions with status "published"
    const data = await Session.find({ status: "published" }).sort({ createdAt: -1 });

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No published sessions found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching sessions",
    });
  }
};

exports.getMySessionData = async (req, res) => {
  try {
    const { userid } =  req.query;

    // Make sure userid is provided
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find all sessions where userId matches
    const data = await Session.find({ user_id:userid});

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sessions found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching user sessions",
    });
  }
};

exports.deletesession = async (req, res) => {
  try {
   const id = req.params.id;

    const deletedSession = await Session.findByIdAndDelete(id);  

    if (!deletedSession) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting session",
    });
  }
};

exports.addsession = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Session published successfully",
      data: updatedSession,
    });
  } catch (error) {
    console.error("Error publishing session:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to publish session",
    });
  }
};



