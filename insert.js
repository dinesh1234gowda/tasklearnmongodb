var mongo=require('mongodb').MongoClient;


var url="mongodb://localhost:27017/";


var express=require('express');

var app=express();

//i would comment previous query before executing new one

mongo.connect(url,function(err,db)
{
	if(err) throw err;

	var dbo=db.db("mydb");

	var muobj=[
	{name:'john',number:997873312,address:'highway'},
	{name:'peter',number:829299393,address:'royal park'},
	{name:'henry',number:93939393,address:'musuem streer'},
	{name:'sylvestor',number:847857578,address:'sky street'}
	];




	dbo.collection("customers").insertMany(muobj,function(err,res)
	{
		if(err) throw err;

		console.log("number of documents inserted:"+res.insertedCount);

		db.close();
	});

	console.log("first json data");
	dbo.collection("customers").findOne({},function(err,result)
	{
		if(err) throw err;
		console.log(result.name);
		db.close();

	});

	console.log("all the json data");


	dbo.collection("customers").find({}).toArray(function(err,result)
	{
		if(err) throw err;

		for(var i=0;i<result.length;i++)
		{
			console.log(result[i].name+"\t\t\t"+result[i].number+"\t\t"+result[i].address);
		}
		db.close();
		
	});


	dbo.collection("customers").find({},{ address:1 }).toArray(function(err,data)
	{
		if(err) throw err;
		console.log(data);
		db.close();
	});

	console.log("------writing custom query");
	var query={address:'royal park'};
	dbo.collection("customers").find(query).toArray(function(err,result)
	{
		if(err) throw err;
		console.log(result);
		db.close();

	});


	var sort={ name:-1 };
	dbo.collection("customers").find().sort(sort).toArray(function(err,res)
	{
		if(err) throw err;
		console.log(res);
		db.close();

	});

	var myquery={address:/^s/};
	dbo.collection("customers").deleteMany(myquery,function(req,obj)
	{
		if(err) throw err;

		console.log(obj.result.n+"documents deleted");
		db.close();

	});


var myquery={address:"highway"};
var newvalues={$set:{name:"dinesh",addres:"mumbai"}};

dbo.collection("customers").updateMany(myquery,newvalues,function(err,res)
{
	if(err) throw err;

	console.log(res.result.nModified+"documents updated");
	db.close();
});




});
