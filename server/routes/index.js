/**
 * Created by JFCS on 3/18/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var todos = require('./todos');



router.use('/todos',todos);

router.get('/*',function(request,response){
   var file = request.params[0] || "/views/index.html" ;
    response.sendFile(path.join(__dirname,"../public/" + file));
});

module.exports = router;