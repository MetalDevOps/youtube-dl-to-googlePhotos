const fs = require('fs');
const youtubedl = require('youtube-dl');
const dotenv = require('dotenv').config();

module.exports = function(youtubeId) {
    return new Promise( (resolve, reject) => {
        const target = 'downloads/' + youtubeId + '.mp4';

        let newName;

        console.log('Downloading ' + youtubeId);

        const video = youtubedl(
            'http://www.youtube.com/watch?v=' + youtubeId,
            ['--format=22'],
            {cwd: __dirname}
        );

        video.on('info', function (info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);

            newName = info.title + ' --- ' +  info.id + '.mp4';

            console.log('new name: ' + newName);
        });

        video.pipe(fs.createWriteStream(target));

        video.on('end', function() {
            console.log('finished downloading ' + youtubeId);

            console.log('end file: ' + target);

            resolve({
                path: target,
                name: newName
            });
        });

        video.on('error', function error(err) {
            reject(err);
        });
    });
};