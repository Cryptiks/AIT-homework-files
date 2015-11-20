var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

// route: item
router.get('/', function(req, res, next) {
    //res.render('list', {list: list});
});

router.post('/create', function(req, res, next) {
	var item = new Item({
		name: req.body.item,
		quantity: req.body.quantity,
    checked: false
  });
  //console.log('item:' +  item);
  List.findOneAndUpdate({slug:req.body.slug}, {$push: {items: item}}, function(err, list, count) {
    console.log('done updating');
    res.redirect("../list/" + req.body.slug);
  });
});

router.post('/check', function(req, res, next) {
  console.log(req.body);
  List.findOne({slug: req.body.slug}, function(err, list, count) {
    // 1 item checked, checklist is string
    if (typeof(req.body.checklist) === 'string') {
      for (var i = 0; i < list.items.length; i++) {
        if (list.items[i].id === req.body.checklist) {
          list.items[i].checked = true;
        }
      }
    }
    // more than 1 item checked, checklist is an array
    else {
      for (var i = 0; i < list.items.length; i++) {
        for (var j = 0; j < req.body.checklist.length; j++) {
          if (list.items[i].id === req.body.checklist[j]) {
            list.items[i].checked = true;
          }
        }
      }
    }
    list.save(function(err, modifiedlist, count) {
  		//console.log(err, modifiedlist);
      res.redirect("../list/" + req.body.slug);
    });
  });
});

module.exports = router;
