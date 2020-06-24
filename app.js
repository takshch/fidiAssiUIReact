const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "fidisys";
const  COLLECTION_NAME = "items";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

var autoIncrement = require("mongodb-autoincrement");
const { response } = require("express");

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/items", (request, response) => {
    collection.find({},{projection:{_id:0}}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/add", (request, response) => {
    collection.find({},{projection:{_id:0}}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/add",(request,response)=>{
    getNextSequence(database, COLLECTION_NAME, function(err, result){
        if(!err){
            database.collection(COLLECTION_NAME).insertOne({id: result, ...request.body},(error,result)=>{
                if(error){
                    return response.status(500).send(error);
                } 
                if(result.result.ok === 1){
                    response.send({status: "success", error: null});
                }else{
                    response.send(result.result);
                }
            });
        }
        else{
            response.send({error: "Something is not right!"});
        }
    });
});

app.post("/update",(req,response)=>{
    collection.updateOne({id: req.body.id},{$set:{price: req.body.price}},(error,result)=>{
        if(error){
            response.send({error: "Something is not right!"});
        }
        else if(result){
            response.send({status: "success",error: null});
        }
    });
});

app.post("/delete",(req, response)=>{
    collection.deleteOne({id: req.body.id},(error,result)=>{
        if(error){
            response.send({error: "Something is not right!"});
        }else if(result.deletedCount === 1){
            response.send({status: "deleted",error: null});
        }
    });
});



//AutoIncrement Function for MongoDB.....
function getNextSequence(db, name, callback) {
    db.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
        if(err) callback(err, result);
        callback(err, result.value.seq);
    } );
}