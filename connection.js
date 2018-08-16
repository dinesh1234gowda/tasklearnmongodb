var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


MongoClient.connect(url, function(err, dbs) {
  if (err) throw err;
  
 console.log(dbs);

  //var dbo = dbs.db("mydb");
  //Create a collection name "customers":
  dbs.createCollection("cust", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    dbs.close();
  });
});



