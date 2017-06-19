var twitterkeys = require("./twitterkeys.js");
var spotifykeys = require("./spotifykeys.js");
var ombdkeys = require("./ombdkeys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
/*var twitterKey = keys.twitterKeys.consumer_key;
var twitterSecret = keys.twitterKeys.consumer_secret;
var twitterTokenKey = keys.twitterKeys.access_token_key;
var twitterTokenSecret = keys.twitterKeys.access_token_secret;
var spotifyID = keys.spotifyKeys.client_ID;
var spotifySecret = keys.spotifyKeys.client_secret;
var omdbAPIKey = keys.omdbKeys.omdbAPI;*/
var command = process.argv[2];
var fs = require("fs");
var client = new twitter(
    twitterkeys
);
var spotify = new Spotify (
	spotifykeys
	);
var nodeArgs = process.argv;
var spotifyTrack = "the sign ace";



// Movie stuff
var movieName = "Mr. Nobody";
	
	
	for (i = 3; i < nodeArgs.length; i++) {
		if (i >= 3 && i < nodeArgs.length) {
		movieName = movieName.replace("Mr. Nobody", "");
		movieName = movieName + nodeArgs[i] + " " ;
		
	}
	}

// spotify stuff
	for (i = 3; i < nodeArgs.length; i++) {

		if (i >= 3 && i < nodeArgs.length){
			
			spotifyTrack = spotifyTrack.replace("the sign ace", "");
			spotifyTrack = spotifyTrack+ nodeArgs[i] + " " ;

			debugger;

			}
			

	}
switch (command) {
    case 'my-tweets':
    case 't':
        console.log('Tweets');
        retrieveTweets();
        break;
    case 'spotify-this-song':
    case 's':
        console.log('Spotify');
        spotifyCall();
        break;
    case 'movie-this':
    case 'm':
        console.log('Movie');
        movieThis();
        break;
    case 'do-what-it-says':
    case 'd':
        console.log('Yassss');
        doingIt();
        break;

}


function retrieveTweets () {
    var params = { screen_name: 'weeeeeee1993' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        	console.log('My 20 most recent tweets: ')
        	for (i = 0; i < 20; i++){
            console.log(JSON.stringify((i+1) + ': ' + tweets[i].text, null, 4))
            console.log(JSON.stringify(tweets[i].created_at, null, 4));
        }
        } else {
            console.log(error);
        }
    });

}

function spotifyCall () {
	spotify.search({ type: 'track', query: spotifyTrack, limit: '1'}, function(err, data) {
		//console.log(spotifyTrack);
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		else {
			console.log('BEST SONG RESULT:')
			console.log('Artist: ' + JSON.stringify(data.tracks.items[0].artists[0].name));
			console.log('Album: ' + JSON.stringify(data.tracks.items[0].album.name));
			console.log('Song: ' + JSON.stringify(data.tracks.items[0].name));
			console.log('Song preview: ' + JSON.stringify(data.tracks.items[0].external_urls.spotify));
			
		}
	});
}

function movieThis() {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	//console.log(movieName);
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200){
			var JSONResponse = JSON.parse(body);
			console.log('YOUR MOVIE RESULT: ')
			console.log('Title: ' + JSONResponse.Title);
			console.log('Year: ' + JSONResponse.Year);
			console.log('IMDB Rating: ' + JSONResponse.imdbRating);
			console.log('Country: ' + JSONResponse.Country);
			console.log('Language: ' + JSONResponse.Language);
			console.log('Plot: ' + JSONResponse.Plot);
			console.log('Actors: ' + JSONResponse.Actors);
		}
		else {
			console.log('error', error, 'statusCode');
		}
	})
}
function doingIt () {
	fs.readFile("random.text", "utf8", function(error, data) {
		if (error) {
			return console.log(error)
		}
		else {
			console.log(data);
			var dataArr = data.split(",");
			for (i = 0; i < dataArr.length; i++) {
				movieName = movieName.replace("Mr. Nobody", dataArr[1]);
				spotifyTrack = spotifyTrack.replace("the sign ace", dataArr[1]);
				if (dataArr[0] = "spotify-this-song"){
					spotifyCall();
				}
				else if (dataArr[0] = "movie-this"){
					movieThis();
				}

			}
			console.log(dataArr);
		}
	})
}


for (i = 2; i < nodeArgs.length; i++) {
var logtext = ""
logtext = logtext + " " + nodeArgs[i];
fs.appendFile("log.text", (logtext) + ", ", function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log("Search logged.")
	}
})
}