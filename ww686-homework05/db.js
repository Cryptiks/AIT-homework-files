// require the module
var mongoose = require("mongoose");

// my schema goes here!
var Movie = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
});

// registering model
mongoose.model("Movie", Movie);

mongoose.connect('mongodb://localhost/hw05');
