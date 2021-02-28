# TODO

****

### youtube-dl-to-googlePhotos
This project downloads all videos from a youtube channel and backups them to google photos

### How to run
You will need the following environment variables:
* photosClientId: google oauth2 client id
* photosClientSecret: google oauth2 client secret
* refreshToken: google oauth2 refresh_token generated using ```generateAuth.js```
* youtubeApiKey: google simple api key for youtube
* photosAlbumID: Google photos album ID generated with ```createAlbum.js```
* channelYoutubeId: any youtube channel that you want backup
* createAlbumName: Set a name for your Google Photos album before run ```createAlbum.js```


### Preparing albums
You will only be able to upload to albums created using the API. Use the ```createAlbum.js``` script to create your albums. 
