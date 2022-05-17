const express = require('express');
const app = express();
const path = require('path');
const port = 27017;
let Cookies = require('cookies');
let bodyParser = require('body-parser');
let unlencodedParser = bodyParser.urlencoded({extended: true});

let mongodb = require('mongodb');
const { cookie } = require('express/lib/response');
const { use } = require('express/lib/application');
const urlencoded = require('body-parser/lib/types/urlencoded');
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});



let titles = {
    first: "First title",
    second: "Second title",
    third: "Third title"
};

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get('/home', function(req, res){
    let cookies = new Cookies(req, res);
    res.render('main', {check: cookies.get('check')});
});

app.get('/universities', function(req, res){
    res.render('universities');
});

app.get('/registration', function(req, res){
    res.render('registration');
});

app.post('/registration', unlencodedParser,  function(req, res){
    let name = req.body.name;
    let LastName = req.body.LastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password; 

    if(email.length > 0 && password.length > 0 && username.length > 0 && name.length > 0 && LastName.length > 0 && password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[!\@\#\$\%\^\&]/)){
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                await coll.insertMany([{name: name, lastname: LastName, username: username, email: email, password: password}]);
            } else {
                console.error(err);
            }
        });
        console.log('Add');
    }
});

app.get('/signin', function(req, res){
    res.render('signin');
});

app.get('/logout', function(req, res){
    res.cookie('check', 0);
    res.redirect('/home');
});

app.get('/myprofile', function(req, res){
    let cookies = new Cookies(req, res);
    let username = cookies.get('username');
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Dinnur');
            let coll = db.collection('users');
            let user = await coll.find({username: username}).toArray();
            let obj = {
                name: user[0].name,
                lastname: user[0].lastname,
                username: user[0].username,
                email: user[0].email,
                password: user[0].password
            }
            res.render('userPage', {obj: obj});
        } else {
            console.error(err);
        }
    });

});

app.post('/signin', unlencodedParser, function(req, res){
    let username = req.body.username;
    let password = req.body.psw;
    if(username == "admin" && password == "Qwerty1!")
    {
        res.redirect('/admin/name');
    }
    else{
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let check = await coll.find({$and: [{username: username}, {password: password}]}).toArray();
                res.cookie('check', check.length);
                res.cookie('username', username);
                if(check.length > 0){
                    res.redirect('/home');
                }
                else {
                    res.send('Error!');
                }
            } else {
                console.error(err);
            }
        });
    }
});

let ObjectID = require('mongodb').ObjectID;

app.get('/admin/:id', function(req, res){
    if(req.params.id == 'name')
    {
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let data = await coll.find().sort({name:1}).toArray();
                let sort = {
                    by: 'name'
                }
                res.render('admin', {data: data, sort: sort});
            } else {
                console.error(err);
            }
        }); 
    }
    else if(req.params.id == 'lastname')
    {
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let data = await coll.find().sort({lastname: 1}).toArray();
                let sort = {
                    by: 'lastname'
                }
                res.render('admin', {data: data, sort: sort});
            } else {
                console.error(err);
            }
        }); 
    }
    else if(req.params.id == 'username')
    {
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let data = await coll.find().sort({username: 1}).toArray();
                let sort = {
                    by: 'username'
                }
                res.render('admin', {data: data, sort: sort});
            } else {
                console.error(err);
            }
        }); 
    }
    else if(req.params.id == 'email')
    {
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let data = await coll.find().sort({email: 1}).toArray();
                let sort = {
                    by: 'email'
                }
                res.render('admin', {data: data, sort: sort});
            } else {
                console.error(err);
            }
        }); 
    }
    else if(req.params.id == 'password')
    {
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Dinnur');
                let coll = db.collection('users');
                let data = await coll.find().sort({password: 1}).toArray();
                let sort = {
                    by: 'password'
                }
                res.render('admin', {data: data, sort: sort});
            } else {
                console.error(err);
            }
        }); 
    }
});

app.post('/create', unlencodedParser, function(req, res){
    let nameInput = req.body.namecreate;
    let lastnameInput = req.body.surnamecreate;
    let usernameInput = req.body.usernamecreate;
    let emailInput = req.body.emailcreate;
    let passwordInput = req.body.passwordcreate;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Dinnur');
            let coll = db.collection('users');
            await coll.insertMany([{name: nameInput, lastname: lastnameInput, username: usernameInput, email: emailInput, password: passwordInput}]);
        } else {
            console.error(err);
        }
    }); 
    res.redirect('/admin/name');
});
app.post('/delete', unlencodedParser, function(req, res){
    let index = req.body.index;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Dinnur');
            let coll = db.collection('users');
            await coll.deleteOne({"_id": ObjectID(index)});
        } else {
            console.error(err);
        }
    }); 
    res.redirect('/admin/name');
});
app.post('/create', unlencodedParser, function(req, res){
    let nameInput = req.body.namecreate;
    let surnameInput = req.body.surnamecreate;
    let usernameInput = req.body.usernamecreate;
    let emailInput = req.body.emailcreate;
    let passwordInput = req.body.passwordcreate;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Dinnur');
            let coll = db.collection('users');
            await coll.insertMany([{name: nameInput, lastname: surnameInput, username: usernameInput, email: emailInput, password: passwordInput}]);
        } else {
            console.error(err);
        }
    }); 
    res.redirect('/admin/name');
});

app.post('/admin', unlencodedParser, function(req, res){
    let nameInput = req.body.name;
    let surnameInput = req.body.surname;
    let usernameInput = req.body.username;
    let emailInput = req.body.email;
    let passwordInput = req.body.password;
    let idInput = req.body.id;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Dinnur');
            let coll = db.collection('users');
            await coll.updateOne({"_id": ObjectID(idInput)}, {$set: {name: nameInput, lastname: surnameInput, username: usernameInput, email: emailInput, password: passwordInput}});
        } else {
            console.error(err);
        }
    });
    res.redirect('/admin/name');
});


app.listen(port, function(){
    console.log('port 27017');
});

