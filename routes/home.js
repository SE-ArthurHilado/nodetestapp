var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {

  //return wrong body
  console.log(req.body);

  res.render('home', { title: 'SE_Aotzu Base GET', user: 'USERNAME', req: simpleStringify(req), res: simpleStringify(res)});
});

router.post('/', function(req, res, next) {
  

  console.log(req.body);

  res.render('home', { title: 'SE_Aotzu Base POST', user: 'USERNAME', req: simpleStringify(req), res: simpleStringify(res)});
});

function simpleStringify (object){
  var simpleObject = {};
  for (var prop in object ){
      if (!object.hasOwnProperty(prop)){
          continue;
      }
      if (typeof(object[prop]) == 'object'){
          continue;
      }
      if (typeof(object[prop]) == 'function'){
          continue;
      }
      simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

module.exports = router;
