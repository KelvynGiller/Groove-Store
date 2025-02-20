const admin = require("firebase-admin");

const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
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