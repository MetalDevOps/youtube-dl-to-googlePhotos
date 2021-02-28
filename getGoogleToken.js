const { google } = require('googleapis');
const dotenv = require('dotenv').config();

const photosClientId = process.env.photosClientId;
const photosClientSecret = process.env.photosClientSecret;
const refreshToken = process.env.refreshToken;

const redirectURL = 'http://localhost:3000/oauth2callback';

module.exports = async function() {
    const oauth2Client = new google.auth.OAuth2(
        photosClientId,
        photosClientSecret,
        redirectURL
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    const newTokens = await oauth2Client.refreshToken(refreshToken);

    return newTokens.tokens.access_token;
};