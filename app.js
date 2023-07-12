
const express = require('express');
const app = express();
const ejs = require('ejs')
const md5  = require('md5')
const bcrypt = require('bcrypt')

// Require data and Collection 
const App = require('./dataAndCollect/dbAndCollect');
// Require data and Collection 
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))



app.get('/',(req,res) => { 
    res.render('home')
});

// **** ***** **** ***** **** ***Route REGISTER**** *** *** *** ** *
app.route('/register')
.get((req,res) => { 
    res.render('register')
})
.post((req,res) => { 
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then((hash) => { 
        const newUser = new App({ 
            username : req.body.username,
            password : hash
        });
        newUser.save().then(() => { 
            console.log('SUCCESS REGISTER');
            res.render('secrets')
        });
    });
 
});

// **** ***** **** ***** **** ***Route LOGINNN**** *** *** *** ** *
app.route('/login')
.get((req,res) => { 
    res.render('login')
})
.post((req,res) => { 
    App.findOne({username : req.body.username}).then( (data) =>
     { 
        if(data){ 
            bcrypt.compare(req.body.password ,data.password).then((result) => { 
            if(result === true) {
                res.render('secrets') 
                console.log('Success Loginn.');
            } else{ 
               res.send('Data not Found')
            }
        })
        }
    }).catch((err) =>
     { 
        if(err){ 
            console.log(err);
        }    
    })
})


app.listen(3000, () => { 
    console.log('Server running in Port 3000');
})
