const express = require('express');
const app = express();
const ejs = require('ejs')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))


app.get('/',(req,res) => { 
    res.render('home')
});

app.route('/register')
.get((req,res) => { 
    res.render('register')
})
.post((req,res) => { 
    console.log(req.body);
})

app.route('/login')
.get((req,res) => { 
    res.render('login')
})

app.listen(3000, () => { 
    console.log('Server running in Port 3000');
})
