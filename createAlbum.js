const Photos = require('googlephotos');
const getGoogleToken = require('./getGoogleToken');
const dotenv = require('dotenv').config();

const createAlbumName = process.env.createAlbumName;


async function createAlbum(albumName) {
    const accessToken = await getGoogleToken();

    const photos = new Photos(accessToken);

    const response = await photos.albums.create(createAlbumName);

    console.log(response);
}

createAlbum();