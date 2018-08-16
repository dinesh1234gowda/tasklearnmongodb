var mongo=require('mongodb').MongoClient;

var url="mongodb://localhost:27017/";

mongo.connect(url,function(err,db)
{
if(err) throw err;

var dbo=db.db("mvc");

var o={id:101,product_id:2000,status:1};

var p=[
{id:002,productid:2000,name:'times watch'},
{id:100,productid:2001,name:'shirt'},
{id:140,productid:2003,name:'bat'}];


dbo.collection("order").insertOne(o,function(err,res)
{

if(err) throw err;
console.log("order collection created");
});

dbo.collection("product").insertMany(p,function(err,res)
{
if(err) throw err;
console.log("product collection created");
});

dbo.collection('order').aggregate(
[{$lookup:
{
	from:'product',
	localField:'product_id',
	foreignField:'productid',
	as:'orderdetails'	

}
	
}

]).toArray(function(err,res)
{
if(err) throw err;

console.log(JSON.stringify(res));
db.close();

});

	
});