var LocalStrategy = require('passport-local').Strategy;

var Event = require('../models/event');

module.exports = function(events) {

    events.serializeUser(function(event, done) {
        done(null, event.id);
    });

    events.deserializeUser(function(id, done) {
        Event.findById(id, function(err, event) {
            done(err, event);
        });
    });
    
    events.use('getevents', new LocalStrategy({
        nameField : 'name',
        dateField : 'date'
    },
    function(req, name, date, done) {
        if (name)
            name = name.toLowerCase(); 

        process.nextTick(function() {
            Event.findOne({ 'event.name' :  name }, function(err, event) {
                if (err){
                    return done(err);    
                } else if (!event) {
                    return done(null, false, req.flash('eventMessage', 'No event found.'));    
                } else {
                    return done(null, event);
                }
            });        
        });

    }));
    events.use('newevent', new LocalStrategy({
        nameField : 'name',
        dateField : 'date'
    },
                                                
    function(req, name, date, done) {
        if (name)
            name = name.toLowerCase(); 

        events.nextTick(function() {
            if (!req.event) {
                Event.findOne({ 'event.name' :  name }, function(err, event) {
                    if (err) {
                        return done(err);
  
                    } else if (event) {
                        return done(null, false, req.flash('eventMessage', 'That event name is already taken.'));
                    } else {

                        var newEvent = new Event();

                        newEvent.event.name = name;
                        newEvent.event.date = date;

                        newEvent.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newEvent);
                        });
                    }

                });
            } else if ( !req.event.event.name ) {
                Event.findOne({ 'event.name' :  name }, function(err, event) {
                    if (err) {
                        return done(err);    
                    } else if (event) {
                        return done(null, false, req.flash('eventMessage', 'That event name is already taken.'));
                    } else {
                        var event = req.event;
                        event.event.name = name;
                        event.event.date = date;
                        event.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null, event);
                        });
                    }
                });
            } else {
                return done(null, req.event);
            }

        });

    }));


};