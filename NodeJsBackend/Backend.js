/*
Boiler plate to setup mysql, express, json parsing and CORS policies
*/
var mysql = require('mysql');
var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.options('*', cors());

/*
Get method that returns a list of the basic info of every product, not including product_description or type  
*/
app.get('/GetProductsBasic', cors(),function (req, res) {
   var con = QueryInit();


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		con.query("select img_url as Image, product_name as Product,price as Price,likes as Likes,id as Description from pokemartapp.products", function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	});
})
/*
Returns everything about a single product, no longer used, but may be useful in the future
*/
app.get('/GetProductDetailed', cors(),function (req, res) {
   var con = QueryInit();


	con.connect(function(err) {
		if (err) throw err;
		con.query("select product_name as Product,price as Price,product_description as Description,likes as Likes,product_type as Type,img_url from pokemartapp.products where id = "+ req.query.val , function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	});
})
/*
Returns only a singles product's description and type, used for in ddecription.html
*/
app.get('/GetProductDescType', cors(),function (req, res) {
   var con = QueryInit();


	con.connect(function(err) {
		if (err) throw err;
		con.query("select product_description as Description,product_type as Type from pokemartapp.products where id = "+ req.query.val , function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	});
})
/*
Login method that is a WIP, not relevant to demo
*/
/*app.get('/Login', cors(),function (req, res) {
  var con = QueryInit();


	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT CASE WHEN EXISTS(SELECT username FROM user where((username = :username1)) THEN 1 ELSE 0 END;" , function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	WIP
	});
})*/

/*
Post method that first checks whether or not a given user has liked a product in the database using a mysql query to see if the user product tuple is in
the liked prodcuts table, 
then depending on that query result increments or decrements the products likes by 1 and either adds or removes the user product tuple
from the liked products table 
*/
app.post('/like', cors(),function (req, res) {
	console.log(req.body.data)
	var con = QueryInit()
	con.connect(function(err) {
		if (err) throw err;
		//Query that returns a 1 if the user has liked the product, a 0 if they havn't yet
		con.query("SELECT CASE WHEN EXISTS(SELECT username FROM pokemartapp.liked_products where(username = " +"'"+ req.body.data.username+ "'" +" and product_name = "+"'"+ req.body.data.product_name + "'"+")) THEN 1 ELSE 0  END as liked", function (err, result) {
			if (err) throw err;
			con.end
			console.log(result[0].liked)
			//The path to remove a like from the database
			if(result[0].liked == 1)
			{
				var con2 = QueryInit();
				con2.connect(function(err) {
					if (err) throw err;
					con2.query("Update pokemartapp.products set likes = likes -1 where product_name= " + "'"+ req.body.data.product_name + "'" , function (err, result) {
						if (err) throw err;
						con2.end
						var con3 = QueryInit();
						con3.connect(function(err) {
							if (err) throw err;
							con3.query("Delete from pokemartapp.liked_products where username = "+ "'" + req.body.data.username + "'" + " and product_name =" + "'" + req.body.data.product_name + "'" , function (err, result) {
								if (err) throw err;
								con3.end
								res.send("UnLiked")
							});
						});
					});
				});
			}		
			//The path to add a like to the database
			else
			{
				var con2 = QueryInit();
				con2.connect(function(err) {
					if (err) throw err;
					con2.query("Update pokemartapp.products set likes = likes + 1 where product_name= " + "'"+ req.body.data.product_name + "'" , function (err, result) {
						if (err) throw err;
						con2.end
						var con3 = QueryInit();
						con3.connect(function(err) {
							if (err) throw err;
							con3.query("Insert into pokemartapp.liked_products values(" + "'" + req.body.data.username + "'" + "," + "'" + req.body.data.product_name + "')" , function (err, result) {
								if (err) throw err;
								con3.end
								res.send("Liked")
							});
						});
					});
				});
			}	
	
		});
	});
})
/*
Get method that checks if a given user has already liked a product 
*/
app.get('/CheckLiked', cors(),function (req, res) {
   var con = QueryInit();
	console.log(req.query.username)
	console.log(req.query.product_name)
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT CASE WHEN EXISTS(SELECT username FROM pokemartapp.liked_products where(username = " +"'"+ req.query.username+ "'" +" and product_name = "+"'"+ req.query.product_name + "'"+")) THEN 1 ELSE 0  END as liked", function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	});
})	
  
/*
NodeJS boilerplate to host the server
*/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
/*
Helper method that returns a sql connection variable to initialize queries, change the user and password to whatever database you use 
*/
function QueryInit()
{
	var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Password1"
	});
	return con
}

