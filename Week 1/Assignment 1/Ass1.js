var express = require('express');
var fetch = require('node-fetch');
var cookieParser =  require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/' , function(req,res){
res.send('Hello World - Rishab');
});

app.get('/authors',function(req,res){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(res) {
        return res.json();
    }).then(function(authors) {
        //console.log(json);

        //console.log('\n\n');

        fetch('https://jsonplaceholder.typicode.com/posts').then(function(re){ return re.json();}).then(function(posts){ 
        	var ret='';
        	for(var i=0;i<authors.length;i++)
        	{
        		var count = 0;
        		for(var j=0;j<posts.length;j+=1)
        		{
        			if(authors[i].id === posts[j].userId)
        			{
        				count++;
        			}
        		}

        		ret+= (authors[i].name + ' - ' + count + ' posts\n');
        	}
        	res.end(ret);
        })
	})
});


app.get('/setcookie' , function(req,res){

	var cookie_name = 'Rishab';

	if(req.cookies.Rishab === undefined)
	{
		res.cookie(cookie_name,'[{"name":"Rishab", "age": 20}]');
		res.send('Cookie set');
	}
	else
	{
		res.send("Cookie already set");
	}
});

app.get('/getcookie' , function(req,res){

	var cookie = JSON.parse(req.cookies.Rishab);
	//console.log("Name : " , cookie[0].name);
	//console.log("\nAge : " , cookie[0].age);

	var info = "Name : "+ cookie[0].name + "</br>Age : "+cookie[0].age;
	res.send(info);
	//console.log(info);
});


app.get('/robot.txt', function(req, res){
	res.status(403).send("Access Denied");
});

app.get('/html', function(req, res){
	res.sendFile('Ass1.html',{root:__dirname});
});

app.get('/image', function(req, res){
	res.sendFile('3312803-kakashi.jpeg',{root:__dirname});
});

app.get('/input', function(req, res){
	res.sendFile('input.html',{root:__dirname});
});

app.get('/input.js', function(req, res){
	res.sendFile('input.js',{root:__dirname});
});

app.post('/takevalue', function(req, res){
	console.log(req.body.value);
});

app.listen(8080,function(req,res){
	console.log('Server started at port 8080\n');
});