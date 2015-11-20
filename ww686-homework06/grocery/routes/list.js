var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');
var User = mongoose.model('User');


// route: lists
router.get('/', function(req, res, next) {
  // List.find(function(err, list, count) {
  //   res.render('list', {list: list, user: req.user});
  // });
  User
    .findOne({username: req.user.username})
    .populate('lists').exec(function(err, user) {

      List.find({user: req.user._id}, function(err, list, count) {
        //console.log(list);
          res.render('list', {list: list, user: req.user});
      });
  });

});

router.get('/create', function(req, res, next) {
  res.render('listcreate', { user: req.user });
});

router.post('/create', function(req, res, next) {
	new List({
		name: req.body.listName,
    user: req.user._id,
  }).save(function(err, list, count) {
    // do stuff when the save is done
    req.user.lists.push(list);
    req.user.save(function(err, savedUser, count) {
      console.log(req.user);
      res.redirect(list.slug);
    });
	});
});


router.get('/:slug', function(req, res, next) {
  console.log(req.user.username);
  User
    .findOne({username: req.user.username})
    .populate('lists').exec(function(err, user) {

      List.findOne({slug: req.params.slug, user: req.user._id}, function(err, list, count) {
        //console.log(list);
        res.render('listdetails', {name: list.name, items: list.items, slug: list.slug, user: req.user});
      });


  });
});

module.exports = router;
