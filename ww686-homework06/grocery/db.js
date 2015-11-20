var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

// my schema goes here!
var Item = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean,
});

var List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: String,
  items: [Item],
});

// before registering model
List.plugin(URLSlugs('name'));

// user schema
var UserSchema = new mongoose.Schema({
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});
UserSchema.plugin(passportLocalMongoose);
mongoose.model('User', UserSchema);

// "register" it so that mongoose knows about it
mongoose.model('List', List);
mongoose.model('Item', Item);


// connect
mongoose.connect('mongodb://localhost/grocerydb');
