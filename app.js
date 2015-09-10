var express = require('express');
var Config = require('./config');
var fs = require('fs');
var twitter = require('twitter');
conf = new Config();
try {
    //var secrets = JSON.parse(process.env.SECRETS);
    var twit = new twitter({
        consumer_key: conf.twitter.consumerKey,
        consumer_secret: conf.twitter.consumerSecret,
        access_token_key: conf.twitter.accessToken,
        access_token_secret: conf.twitter.accessTokenSecret
    });
    
}
catch(err) {
    console.log(err);
    process.exit(1);
}


fs.readFile('data/db2.csv', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    else {  
        main();
    }
});


function formatTweets(data){
	var response;
			try{
				 response = {tweets:
					data.map(function(elem){
						var t = {
							text:elem.text,
							screen_name:elem.user.screen_name,
							name:elem.user.name,
							profile_image_url:(function(user) {
								if(user && user.profile_image_url) {
									return user.profile_image_url;
								}
								else {
									return "";
								}
							}(elem.user)),
							retweet:false
						}; 
						if(elem.text && elem.text.substr(0,2) == "RT") {
							t.text = t.text.substr(t.text.search(":")+2);
							t.retweet = true;
							t.profile_image_url=(function(user) {
								if(user && user.profile_image_url) {
									return user.profile_image_url;
								}
								else {
									return "";
								}
							}(elem.retweeted_status));
						}
						if(elem.in_reply_to_status_id_str!=null){
							t.in_reply_to=elem.in_reply_to_status_id_str;
						}
						return t;
					})
				};
				
				return response;
			}
			catch(err) {
				console.log("[app.js] error: "+err);
			}
}



var getTweets = function(req, res) {
    var count = 10;
    if(req.query.count) {
        count = req.query.count;
    }
    twit.get('/statuses/user_timeline.json', 
    {screen_name:'danywarner',count:count,exclude_replies:'false'},
    function(data) {
	var response = {};
		if(data instanceof Error) {
			console.log("TWITTER ERROR: "+JSON.stringify(data));
			res.status(200).send(response);
			return;
		}
		else {
			response=formatTweets(data);
		}
		res.status(200).send(response);
    });
}
var getTwitterBanner = function(req,res) {
	
    twit.get('/users/profile_banner.json', 
    {screen_name:'danywarner'},
    function(data) {
        res.status(200).send(data);
    });

}




var getFavorites = function(req, res){
	 twit.get('/favorites/list.json', 
    {screen_name:'danywarner'},
    function(data) {
       data=formatTweets(data);
       res.status(200).send(data);
    });

}

var postLoveNode = function(req,res) {
	
    twit.post('/statuses/update.json', 
    {status: 'Is it sick if I say that reading Hunger Games makes me hungry?'},
    function(data) {
        res.status(200).send(data);
    });

}

var getHome = function(req,res) {
    
     twit.get('/statuses/home_timeline.json', 
    {count: 30},
    function(data) {
    	data=formatTweets(data);
        res.status(200).send(data);
    });
}

var getMentions = function(req,res) {
    
     twit.get('/statuses/mentions_timeline.json', 
    //{count: 30},
    function(data) {
    //	data=formatTweets(data);
        res.status(200).send(data);
    });
}

var getFollowers = function(req,res) {
    
     twit.get('/followers/list.json', 
    function(data) {
    //	data=formatTweets(data);
        res.status(200).send(data);
    });
}

var getFollowing = function(req,res) {
    
     twit.get('/friends/list.json', 
    function(data) {
    //	data=formatTweets(data);
        res.status(200).send(data);
    });
}


var main = function() {
    var app = express();

    app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    
    app.get('/tweets', getTweets);
    app.get('/banner', getTwitterBanner);
    app.get('/favorites', getFavorites);
    app.get('/mentions', getMentions);
    app.get('/followers', getFollowers);
    app.get('/following', getFollowing);

    app.get('/postLoveNode', postLoveNode);
    app.get('/', getHome);


    var port = process.env.PORT || 3000;

    app.listen(port, function() {
        console.log("Listening on " + port);
    });
}


