module.exports = {

	'fbAuth' : {
		'clientID' 		: '1648519728518061', // 
		'clientSecret' 	: 'fdf524436d782b90ec8ffc7b46051a66', 
		'callbackURL' 	: 'http://localhost:5000/auth/facebook/callback',
        'profileURL'    : 'https://graphs.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileField'  : ['id', 'email', 'name']
	}
    
};