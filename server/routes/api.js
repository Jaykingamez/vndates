const express = require('express');
const router = express.Router();

// handles encryption
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

const MongoClient = require('mongodb').MongoClient;
// string to connect to mongoDB database
const ConnectionString = 'mongodb+srv://test1:testone1@vndates.z5sgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// convert string ids to MongoDB Object Ids
const ObjectId = require('mongodb').ObjectID;
// used to stream files
var GridFSBucket = require('mongodb').GridFSBucket;
// used to upload files
const upload = require('../upload');
// reference to database
var db;
// reference to upload photo
var gridFSBucket;

const AccountDatabase = 'Account';
const MatchDatabase = 'Match';

MongoClient.connect(ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('Vndates');
    gridFSBucket = new GridFSBucket(db, { bucketName: 'photos' });
});

// get all existing matches with current user
router.route('/match/:id').get(function(req, res) {
    db.collection(MatchDatabase).find({ $or: [{ "accountId": req.params.id }, { "secondAccountId": req.params.id }] }).toArray().then(results => {
        res.send(results);
    }).catch(error => console.error(error));
});

// insert new match
router.route('/match').post(function(req, res) {
    // get a random account
    var promise = db.collection(AccountDatabase).aggregate([{ $sample: { size: 1 } }]).next();
    promise.then((doc) => {
        console.log(doc["_id"]);
        db.collection(MatchDatabase).insertOne({
            "accountId": req.body.accountId,
            "secondAccountId": String(doc["_id"]),
            "firstIdStatus": "null",
            "secondIdStatus": "null"
        }, (err, results) => {
            if (err) return console.log(err);
            res.send(results);
        });
    });
});

// update match
router.route('/match/:_id').put(function(req, res) {
    console.log(req.body.newItem);
    db.collection(MatchDatabase).updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: { "firstIdStatus": req.body.newItem.firstIdStatus, "secondIdStatus": req.body.newItem.secondIdStatus }
    }, (err, results) => {
        res.send(results);
    });
});

// delete match
router.route('/match/:_id').delete(function(req, res) {
    db.collection(MatchDatabase).deleteOne({ "_id": ObjectId(req.params._id) }, (err, results) => {
        if (err) return console.log(err);
        res.send(results);
    });
});

// authenticate account
router.route('/auth').post(function(req, res2) {
    db.collection(AccountDatabase).findOne({ "username": req.body.username }, {
        password: 1,
        email: 1,
        _id: 1
    }, function(err, result) {
        if (result == null) res2.send([{ "auth": false }]);
        else {
            bcrypt.compare(req.body.password, result.password, function(err, res) {
                if (err || res == false) {
                    res2.send([{ "auth": false }]);
                } else {
                    res2.send([{ "auth": true, "_id": result._id }]);
                }
            });
        }
    });
});

//get account
router.route('/account/:_id').get(function(req, res) {
    db.collection(AccountDatabase).findOne({ "_id": ObjectId(req.params._id) }, function(err, result) {
        if (err) return console.log(err)
        res.send(result);
    });
})

//insert new account
router.route('/account').post(function(req, res) {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, function(err, hash) {
        db.collection(AccountDatabase).insertOne({
            "username": req.body.username,
            "password": hash,
            "email": req.body.email
        }, (err, result) => {
            if (err) return console.log(err)
            console.log('user registered')
            res.send(result['ops']);
        });
    });
});

//add Fake Profile
router.route('/fakeProfile/:_id').put(function(req, res) {
    console.log("adding in fake profile");
    db.collection(AccountDatabase).updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: { "fakeProfile": req.body }
    }, (err, results) => {
        res.send(results);
    });
});

//add Real Profile
router.route('/realProfile/:_id').put(function(req, res) {
    console.log("adding in real profile");
    db.collection(AccountDatabase).updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: { "realProfile": req.body }
    }, (err, results) => {
        res.send(results);
    });
});

//upload photo
router.route('/image/:filename').post(upload.single("file"), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

//get image
router.route('/image/:filename').get(function(req, res) {
    const readstream = gridFSBucket.openDownloadStreamByName(req.params.filename).on("error", (err) => {
        // if there's an error, end the process and send a message
        res.status(400).send({
            message: 'This is an error!'
        });
    }).pipe(res);
});

//update account
router.route('/account/:_id').put(function(req, res) {
    console.log(req);
    db.collection(AccountDatabase).updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: req.body
    }, (err, results) => {
        res.send(results);
    }).catch(error => console.error(error));
});

//delete account
router.route('/account/:_id').delete(function(req, res) {
    db.collection(AccountDatabase).deleteOne({ "_id": ObjectId(req.params._id) }, (err, results) => {
        res.send(results);
    });
});

module.exports = router;