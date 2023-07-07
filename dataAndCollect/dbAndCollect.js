require('dotenv').config()
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
mongoose.connect('mongodb://127.0.0.1:27017/appSecret');

const userSchema = new mongoose.Schema(
    { username : String, password : String }
)


userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields: ["password"]});

const App = mongoose.model('secrets', userSchema);
module.exports = App;
