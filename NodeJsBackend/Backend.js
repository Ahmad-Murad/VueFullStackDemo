var mysql = require('mysql');
var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.options('*', cors());
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
app.get('/Login', cors(),function (req, res) {
  /* var con = QueryInit();


	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT CASE WHEN EXISTS(SELECT username FROM user where((username = :username1)) THEN 1 ELSE 0 END;" , function (err, result) {
		if (err) throw err;
		con.end
		console.log(result);
		res.json(result);
		});
	WIP
	});*/
})
app.post('/like', cors(),function (req, res) {
	console.log(req.body.data)
	var con = QueryInit()
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT CASE WHEN EXISTS(SELECT username FROM pokemartapp.liked_products where(username = " +"'"+ req.body.data.username+ "'" +" and product_name = "+"'"+ req.body.data.product_name + "'"+")) THEN 1 ELSE 0  END as liked", function (err, result) {
			if (err) throw err;
			con.end
			console.log(result[0].liked)
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
  

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

function QueryInit()
{
	var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Hackerman5959+"
	});
	return con
}

