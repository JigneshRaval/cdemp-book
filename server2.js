var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(function(req, res, next){
	console.log("Server.js --> ", req.method, req.url);
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/',function(req,res){
	res.sendFile(__dirname + "/app/components/snippets/index.html");
});

app.post('/login',function(req,res){
	var user_name=req.body.name;
	var password=req.body.email;
	console.log("User name = "+user_name+", password is "+password);
	res.end("yes");
});

app.listen(3000,function(){
	console.log("Started on PORT 3000");
})
