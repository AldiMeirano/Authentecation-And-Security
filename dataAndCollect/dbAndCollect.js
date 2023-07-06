const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/appSecret');

const schemaSecret = new mongoose.Schema(
    { username : String, password : String }
)
const App = mongoose.model('secrets', schemaSecret);



module.exports = App;