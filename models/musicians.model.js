const mongoose = require('mongoose');
// const passport = require('passport-local-mongoose');
//installl passport and require it in server

var musicianSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: 'This field is required.'
        
    },

    
    email: {
        type:String
    },

    
    mobile: {
        type: String,
        required: 'This field is required.'
    },

    city: {
        type: String,
        required: 'This field is required.'
    }


})
// Custom validation for email
musicianSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Musician', musicianSchema);