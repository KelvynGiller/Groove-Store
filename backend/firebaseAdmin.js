const admin = require("firebase-admin");

const serviceAccount = require("./groove-store-firebase-adminsdk-fbsvc-cb18b69ca5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error); 
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;