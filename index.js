var express = require('express');
var app = express();


function queryMobile(mobile_num,req,res){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
	    host: '172.16.0.101',
	    user: 'dev',
	    password: '123',
	    database:'db_test'
	});

	connection.connect();
	//查询
	console.log("query");

	var sql =  "select * from user_info where mobile_num=" + mobile_num;

	connection.query(sql, function(err, result) {
	    if (err)
		{
			throw err;
        }
        console.log("password:" + result[0].password);

        //console.log("result:" + result[0].toJSON());
	    // console.log('The solution is: ', rows[0].solution);

		var resJsonObj = {"password":result[0].password};


        var  resJson = JSON.stringify(resJsonObj);

		var resstr = "cb(" + resJson+ ")";
	    res.send(resstr);
	    connection.end();
	});
	//关闭连接
	
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {

    var phoneNumber = req.query.phoneNumber;
    queryMobile(phoneNumber,req,res);
   // res.send('hello world');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});