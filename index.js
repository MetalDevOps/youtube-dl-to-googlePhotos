const getExistingPhotos = require("./getExistingPhotos");
const download = require("./download");
const upload = require("./upload");
const search = require("./search");
const dotenv = require('dotenv').config();

const photosAlbumID = process.env.photosAlbumID;
const channelYoutubeId = process.env.channelYoutubeId;
const channelYoutubeId2 = process.env.channelYoutubeId2;

// ignore problematic videos, not public ones
const ignoredVideos = [
    'KVEl3EeGGjQ',
    '7ljyjOwZs3g',
    'wsZgLBXFplY',
    '3h-1qEarHqA',
    'LtjV8EKWwlg',
    'd0Y4HvqR1BE',
    'YrXfpe-vWWc',
    'YVniLEG-57g',
    'XlVWh-_zsXk',
    '_7sXmTjKC9c',
    'a8vr6KmC_TA',
    'w4yOFtycSzo',
    'eFA7yEpXnqI',
    '1pGoqkKv-Zs'
];

function getNewVideos(photos, videos) {
    return videos.filter((video) => {
        let hasPhoto = true;

        photos.forEach((photo) => {
            if (photo && photo.description && photo.description.indexOf(video) >= 0) {
                hasPhoto = false;
            }
        });

        return hasPhoto;
    }).filter((video) => {
        return ignoredVideos.indexOf(video) === -1;
    });
}

async function downloadUploadVideo(youtubeId, albumId) {
    let downloaded;

    try {
        downloaded = await download(youtubeId);
    } catch (e) {
        console.log(e);
        console.log('Retrying download');

        try {
            downloaded = await download(youtubeId);
        } catch(e) {
            console.log("All tries to download " + youtubeId + " failed");
        }
    }

    console.log('Now uploading');

    try {
        await upload(downloaded.path, downloaded.name, albumId);
    } catch (e) {
        console.log(e);

        console.log('Retrying upload');

        await upload(downloaded.path, downloaded.name, albumId);
    }

    console.log('video ' + youtubeId + ' processed');
}

async function run(albumId, channelId) {
    const videos = await search(channelId);

    console.log('Fetched videos: ');

    //videos.forEach((vid) => { console.log(vid); });

    const photos = await getExistingPhotos(albumId);

    //photos.forEach((photo) => { console.log(photo); });

    const newVideos = getNewVideos(photos, videos);

    console.log('Videos to download: ', newVideos);

    for (let count = 0; count < newVideos.length; count++) {
        await downloadUploadVideo(newVideos[count], albumId);
        console.log('Videos left to download: ' + (newVideos.length - count));
    }

    console.log('done');
}

// const albumGooglePhotos = 'AP09ZdiXVCwMXhgIEcSIJRRzv2quynhG82FQbaz8RTnoCMdWbC3YD6sw6asZB1cdzLLefQDlkGgj';
// const channelYoutube = "UCIQSL5e24bC0BmZOnZU3v8Q";

const albumGooglePhotos = photosAlbumID;
const channelYoutube = channelYoutubeId;

(async () => {
    try {
        await run(albumGooglePhotos, channelYoutube);

        // console.log("Now going to second channel");

        // await run(albumGooglePhotos, channelYoutube);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();