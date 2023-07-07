
const express = require('express');
const app = express();
const ejs = require('ejs')


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
    // App.insertMany(req.body).save().then(() => {
    //     console.log('Success add REGISTER');
    //     res.render('secrets')
    // })
    const newUser = new App({ 
        username : req.body.username,
        password : req.body.password
    })
    newUser.save().then(() => { 
        console.log('SUCCESS REGISTER');
        res.render('secrets')
    })
})

// **** ***** **** ***** **** ***Route LOGINNN**** *** *** *** ** *
app.route('/login')
.get((req,res) => { 
    res.render('login')
})
.post((req,res) => { 
    App.findOne({username : req.body.username}).then( (data) =>
     { 
        if(data && data.password === req.body.password){ 
            console.log('Success Login');
            res.render('secrets');
        }else{ 
            if(!data){
                res.send('Data tidak ada');
            }
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
