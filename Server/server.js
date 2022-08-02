const express = require('express'); // Include ExpressJS
const mongo = require("mongodb").MongoClient // Include MongoDB
var cors = require('cors');
const app = express(); // Create an ExpressJS app

// The body-parser module is middleware that parses user input and makes it available through the req.body property.
const bodyParser = require('body-parser'); // middleware
const { ObjectId } = require('mongodb');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.options('*', cors());

// login response
app.post('/login', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const email = req.body.email;
    const password = req.body.password;
    var success = false;
    var errorMessage;
    var name;
    var id;
    var query = { email: email };
    users.find(query, { projection: { _id: 1, email: 1, password: 1, name: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            if (items.length === 1) {
                if (items[0].password === password) {
                    console.log(items[0].password);
                    success = true;
                    errorMessage = null;
                    name = items[0].name;
                    id = items[0]._id;
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    console.log(errorMessage, success, id, name);
                    return;
                } else {
                    //invalid password
                    success = false;
                    name = null;
                    id = null;
                    errorMessage = "Invalide Password!";
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    return;
                }
            } else {
                // mutilple users with same email
                if (items.length > 1) {
                    res.status(200).json({ users: items });
                    return;
                }
                else {
                    //invalid email
                    success = false;
                    name = null;
                    id = null;
                    errorMessage = "Invalide Email!";
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    return;
                }
            }
        }
    })
});

// register response
app.post('/register', (req, res) => {
    // Insert register Code Here
    console.log("request: ", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    var success = false;
    var errorMessage;

    // Check if email already register or not?
    var query = { email: email };
    users.find(query, { projection: { _id: 0, email: 1, password: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return;
        } else {
            // if email found skip register new user
            if (items.length === 1) {
                if (items[0].email === email) {
                    errorMessage = "This Email is already registered!";
                    success = false;
                    res.status(200).json({ "errorMessage": errorMessage, "success": success });
                    console.log(items[0].email, " email found!");
                    return;
                }
            }

            console.log(email, " not found!");
            // if email not found register new user
            users.insertOne(
                {
                    name: name,
                    email: email,
                    password: password
                },
                (err, result) => {
                    if (err) {
                        console.error(err)
                        res.status(500).json({ err: err })
                        return
                    }
                    else {
                        success = true;
                        errorMessage = null;
                        res.status(200).json({ "errorMessage": errorMessage, "success": success });
                        console.log("user registered successfully!");
                        return;
                    }
                }
            )
            console.log(name, email, password);
            return;
        }
    })
});


// user name update response
app.put('/user/name', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const id = req.body.id;
    const newName = req.body.newName;
    var success = false;
    var errorMessage;
    console.log(id, newName);
    var query = { _id: ObjectId(id) };
    users.find(query, { projection: { _id: 1, email: 1, password: 1, name: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            if (items.length === 1) {
                console.log("found!\n")
                console.log("Old name: ", items[0].name);
                console.log(id, newName);
                users.findOneAndUpdate(query, { $set: { "name": newName } });
                success = true;
                errorMessage = null;
                console.log("Updated name: ", newName);
                res.status(200).json({ "errorMessage": errorMessage, "success": success });
            } else {
                // mutilple users with same email
                errorMessage = "Name not Updated!";
                success = false;
                console.log("length: ", items.length);
                res.status(200).json({ "errorMessage": errorMessage, "success": success });

            }
        }
    })
});


// user name update response
app.delete('/user', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const id = req.body.id;
    try {
        var success = false;
        var errorMessage;
        console.log("\nDelete: ", id);
        var query = { _id: ObjectId(id) };
        console.log("found!")
        users.deleteOne(query);
        success = true;
        errorMessage = null;
        console.log("Deleted!\n")
        res.status(200).json({ "errorMessage": errorMessage, "success": success });

    } catch (error) {
        errorMessage = "Account not Deleted!";
        success = false;
        console.log("Not Deleted!\n")
        res.status(200).json({ "errorMessage": errorMessage, "success": success });
    }

});



// activity response
app.post("/activity", (req, res) => {
    activity.insertOne(
        {
            name: req.body.name,
            date: req.body.date,
            userId: req.body.userId,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log("Activity Added Successfully!");
            res.status(200).json({ success: true })
        }
    )
})


app.get("/activities", (req, res) => {
    activity.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        console.log("Activity sent Successfully!");
        res.status(200).json({ items, success: true })
    })
})


// chat response
app.post("/chat", (req, res) => {
    chats.insertOne(
        {
            name: req.body.name,
            date: req.body.date,
            userId: req.body.userId,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log("Chat Added Successfully!");
            res.status(200).json({ success: true })
        }
    )
})


app.get("/chats", (req, res) => {
    chats.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        console.log("Chat sent Successfully!");
        res.status(200).json({ items, success: true })
    })
})

// teams response
app.post("/team", (req, res) => {
    teams.insertOne(
        {
            name: req.body.name,
            date: req.body.date,
            userId: req.body.userId,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log("Teams Added Successfully!");
            res.status(200).json({ success: true })
        }
    )
})


app.get("/teams", (req, res) => {
    teams.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        console.log("Teams sent Successfully!");
        res.status(200).json({ items, success: true })
    })
})

// Message response
// insert message in database
app.post("/message", (req, res) => {
    messages.insertOne(
        {
            sideBar1: req.body.sideBar1,
            sideBar2: req.body.sideBar2,
            message: req.body.message,
            date: req.body.date,
            userId: req.body.userId,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log("Message Added Successfully!");
            res.status(200).json({ success: true })
        }
    )
})

// find messages in database
app.post("/messages", (req, res) => {

    console.log("request: ", req.body);
    const sideBar1 = req.body.sideBar1;
    const sideBar2 = req.body.sideBar2;
    const userId = req.body.userId;

    var query = { sideBar1: sideBar1, sideBar2: sideBar2, userId: userId };
    messages.find(query).sort("date").toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            if (items.length > 0) {
                console.log("Messages sent Successfully!");
                res.status(200).json({ items, success: true });
                return;
            } else {
                // items.length = 0
                console.log("Messages not sent Successfully!");
                res.status(200).json({ items, success: false });
                return;
            }
        }
    })

})


const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

const url = "mongodb://localhost:27017"

// Next, let’s connect to the database using connect():
// and while we’re here, let’s also get a reference to the names and expenses collections:
let db, users, activity, chats, teams, messages

mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("SnipsPro")
        users = db.collection("users")
        activity = db.collection("activity")
        chats = db.collection("chats")
        teams = db.collection("teams")
        messages = db.collection("messages")

    }
)

