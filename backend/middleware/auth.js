const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user = require("../Models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  try {
	console.log("Incoming headers:", req.headers); // ✅ debug log

	let token = null;

	if (req.cookies?.token) {
	  token = req.cookies.token;
	} else if (req.body?.token) {
	  token = req.body.token;
	} else if (req.headers?.authorization && req.headers.authorization.startsWith("Bearer ")) {
	  token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
	console.error("Token missing in request headers or cookies");
	  return res.status(401).json({
		success: false,
		message: "Token missing",
	  });
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	req.user = decoded;
	next();
  } catch (error) {
	console.error("Auth error:", error);
	return res.status(401).json({
	  success: false,
	  message: "Invalid token",
	});
  }
};

