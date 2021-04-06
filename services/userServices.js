var config = require('../configuration/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//create/register new user
const userRegistration = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.antarcticaDb);

        let fname = req.body.fname;
        let lname = req.body.lname;
        let emailId = req.body.emailId;
        let password = req.body.password;
        let orgName = req.body.orgName;

        if (fname && lname && emailId && password && orgName) {
            let userData = {
                fname,
                lname,
                emailId,
                password: bcrypt.hashSync(password, 8),
                orgName
            }

            let result = await dba.collection(config.usersCollection).insertOne(userData);
            if (result.insertedCount) {
                res.send({
                    id: result.insertedId
                });
            } else {
                res.sendStatus(500)
            }
        }

    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports.userRegistration = userRegistration;

// login for existing users
const userLogin = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.antarcticaDb);

        if (req.body.emailId && req.body.password) {
            let result = await dba.collection(config.usersCollection).find({
                emailId: req.body.emailId
            }).project({
                password: 1
            }).toArray();

            if (result.length) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
                if (!passwordIsValid) return res.status(401).send({
                    auth: false,
                    token: null
                });

                let token = jwt.sign({
                    id: result[0]._id
                }, config.secret, {
                    expiresIn: 86400 // valid till 24 hours
                });

                res.status(200).send({
                    auth: true,
                    token: token
                });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(500)
        }

    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports.userLogin = userLogin;


// search using fname, lname, _id (i.e. employeeId)
const dataSearch = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.antarcticaDb);

        let searchValue = req.query.searchValue;
        let query = {
            "$text": {
                "$search": searchValue.toLowerCase()
            }
        }

        const result = await dba.collection(config.usersCollection).find(query).project({
            password: 0
        }).toArray();
        res.send({result});
    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports.dataSearch = dataSearch;


// sort complete list using fname, lname, _id (i.e. employeeId), orgName
const sortUserData = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.antarcticaDb);

        let sortParam = req.query.sortParam;
        let sortOrder = req.query.sortOrder;

        let value = (sortOrder == "asc" ? 1 : -1)

        let result = await dba.collection(config.usersCollection).find().project({
            password: 0
        }).sort({
            [sortParam]: value
        }).toArray();
        res.send(result);
    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports.sortUserData = sortUserData;


// get all users in pagination
const pagination = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.antarcticaDb);

        const skip = parseInt(req.query.skip); // page number
        const limit = parseInt(req.query.limit); // data per page

        var options = {
            allowDiskUse: false
        };

        var pipeline = [{
                "$match": {}
            },
            {
                "$skip": skip
            },
            {
                "$limit": limit
            }
        ];

        let result = await dba.collection(config.usersCollection).aggregate(pipeline, options).project({
            password: 0
        }).toArray();
        res.send(result);
    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports.pagination = pagination;


