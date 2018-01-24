var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var eventSchema = mongoose.Schema({

    event : {
        name : String,
        date : String
    }
});

module.exports = mongoose.model('Event', eventSchema);