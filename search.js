const apiKey = process.env.youtubeApiKey;
const youtube = require('youtube-api');
const dotenv = require('dotenv').config();

function channelVideosRecursive(channelId, callStackSize, pageToken, currentItems, callback) {
    console.log('Fetching youtube page ' + pageToken);

    youtube.search.list({
        type: 'video',
        part: 'snippet',
        pageToken: pageToken,
        maxResults: 50,
        channelId: channelId,
    }, function(err, resData) {
        if (err) {
            console.log('error: ' + err);
            process.exit(1);
        }

        const data = resData.data;

        for (var item in data.items) {
            currentItems.push(data.items[item]);
        }

        if (data.nextPageToken) {
            channelVideosRecursive(channelId, callStackSize + 1, data.nextPageToken, currentItems, callback);
        } else {
            callback(currentItems);
        }

    });
}

module.exports = function(channelId) {
    return new Promise((resolve) => {
        youtube.authenticate({
            type: 'key',
            key: apiKey
        });

        channelVideosRecursive(channelId, 0, null, [], function(fetchedVideos) {
            const videos = fetchedVideos.map((video) => { return video.id.videoId; });

            resolve(videos);
        });
    });
};
