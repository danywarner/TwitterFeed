module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
            twitter: {
		consumerKey: 'uxa33f9yBVQsbdxpm1Xp4SROF',
		consumerSecret: 'RCHBQljurE6t09AAkGGpZ3JUnwB42vcmcB9ne1N5j9rNrj3NCu',
		accessToken: '1268647050-8TPyccv6Iq0bc0xeqM2TlAZy05W1txPG56LnVlA',
		accessTokenSecret: '91GhbHczdplGJnZAu5ILpZTv6sgTtofJQFY6XIlRUak5L'
	}};

        case 'production':
            return {
            	twitter: {
		consumerKey: 'uxa33f9yBVQsbdxpm1Xp4SROF',
		consumerSecret: 'RCHBQljurE6t09AAkGGpZ3JUnwB42vcmcB9ne1N5j9rNrj3NCu',
		accessToken: '1268647050-8TPyccv6Iq0bc0xeqM2TlAZy05W1txPG56LnVlA',
		accessTokenSecret: '91GhbHczdplGJnZAu5ILpZTv6sgTtofJQFY6XIlRUak5L'
	}};

        default:
            return {aaa:'bbb'};
    }
};