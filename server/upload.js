// File handles uploading of image to MongoDB using GridFS and Multer

const util = require("util");
// multer to upload image to GridFS
const multer = require("multer");
// module that will upload to MongoDB using GridFS and Multer
const { GridFsStorage } = require("multer-gridfs-storage");
const MongoClient = require('mongodb').MongoClient;
// string to connect to mongoDB database
const ConnectionString = "mongodb+srv://test1:testone1@vndates.z5sgy.mongodb.net/Vndates?retryWrites=true&w=majority";

var db;
MongoClient.connect(ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('Vndates');
});

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url: ConnectionString,
    db: db,
    file: (req, file) => {
        return {
            filename: req.params.filename,
            bucketName: 'photos'
        }
    }
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

module.exports = upload;