const jwt = require("jsonwebtoken");

/**
 * Creates a token for a user.
 * @param {string} id The id of the user to generate an access token for.
 * @returns {string} The token.
 */
const generateAccessToken = id => {
    // Ensure that the ACCESS_TOKEN_SECRET environment variable is set
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET environment variable is not set");
    }

    const token = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });
    return token;
};

module.exports = generateAccessToken;
