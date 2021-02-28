const Photos = require('googlephotos');
const getGoogleToken = require('./getGoogleToken');
const dotenv = require('dotenv').config();

async function getExistingPhotos(albumId) {
    const accessToken = await getGoogleToken();

    const photos = new Photos(accessToken);

    let nextPageToken = null;
    let allItems = [];

    while (nextPageToken !== undefined) {
        console.log('Getting page of google photos ' + nextPageToken);

        const responsePhotos = await photos.mediaItems.search(albumId, 19, nextPageToken);

        allItems = allItems.concat(responsePhotos.mediaItems);

        nextPageToken = responsePhotos.nextPageToken;
    }

    return allItems;
}

module.exports = getExistingPhotos;