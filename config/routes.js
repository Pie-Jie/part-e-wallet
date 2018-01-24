module.exports = function(app, passport, events) {
//module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('pages/index'); 
	});

	app.get('/login', function(req, res) {
		res.render('pages/login', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/overview', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));

	app.get('/signup', function(req, res) {
		res.render('pages/signup', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/overview', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile', {
            user: req.user
        })
    });
    
    app.get('/myevents', isLoggedIn, function(req, res) {
		res.render('pages/myevents', {
			user : req.user 
		});
	});
    
    app.get('/myevents/:userid/organizing', isLoggedIn, function(req, res) {
		res.render('pages/organizing', {
			user : req.user 
		});
	});
    
    app.get('/myevents/:userid/attending', isLoggedIn, function(req, res) {
		res.render('pages/attending', {
			user : req.user 
		});
	});
    
    app.get('/newevent', isLoggedIn, function(req, res) {
        res.render('pages/newevent', {
            user : req.user,
            message: req.flash('eventMessage')
        });
    });
    app.post('/newevent', events.authenticate('newevent', {
		successRedirect : '/overview', 
		failureRedirect : '/newevent', 
		failureFlash : true 
	}));

    
    app.get('/overview', isLoggedIn, function(req, res) {
		res.render('pages/overview', {
			user : req.user
        });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

