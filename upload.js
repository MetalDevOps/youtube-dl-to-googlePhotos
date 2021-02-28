const Photos = require('googlephotos');
const getGoogleToken = require('./getGoogleToken');

module.exports = async function upload(filePath, fileName, albumId) {
    const accessToken = await getGoogleToken();

    const photos = new Photos(accessToken);

    try {
        await photos.mediaItems.upload(
            albumId,
            undefined,
            filePath,
            fileName
        );
    } catch (e) {
        if (e && e.response && e.response.text) {
            let body = await e.response.text();

            console.log(body);
        }

        throw e;
    }

    console.log('upload done');
};