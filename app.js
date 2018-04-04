const express = require('express');
const app = express();
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));*/

const path = require('path');
const server = require('http').createServer(app);


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.once('open', ()=> {
	console.log('db connected');
});

let PostSchema = new mongoose.Schema({
	text : {type : String }//text에 다 넣는것  schema를	
});

//const a = {};
// a.text = { type : String }
//와 같은 것

let Posts = mongoose.model('posts', PostSchema);//Posts라는 table에 

app.post('/write', (req,res)=>{
	const current = new Posts({
		text : "aa"
	});
	current.save((err)=>{
		res.send({data : "good"});	
	});
});


//app.post('/test', (req, res) => {
//	const obj = {"data" : "good"};
//	res.send(obj);
//});

app.post('/getpost', (req, res)=>{
	Posts.find({}, (err,posts)=>{
		res.send({data: posts});		
	});
});

app.get('/hello', (req, res)=>{
	const obj = {
		"data" : "!"
	};
	res.send(obj);
});

app.use('/', express.static(__dirname + '/public'));

const port = 5000;

server.listen(port, ()=>{
	console.log('listen on ' + port);
});

																					
