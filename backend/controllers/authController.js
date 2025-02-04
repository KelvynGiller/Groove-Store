const { auth } = require('express-openid-connect');

const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
};

const authMiddleware = auth(authConfig);

const userProfile = (req, res) => {
    res.json(req.oidc.user); 
};

const logoutUser = (req, res) => {
    res.oidc.logout();
};

module.exports = {
    authMiddleware,
    userProfile,
    logoutUser
};