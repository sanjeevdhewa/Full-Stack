//mongoose library
const mongoose = require('mongoose');
//need 1 propert from mongoose
const { Schema } = mongoose;//or const Schema = mongoose.Schema
// Schema contains all the different properties our database collection has for example hefight,id,weight,name etc

//it describe every individual record look like
const userSchema = new Schema({
	googleId: String
});


//1st argument user collection and 2nd is userschema mongoose.model create a new record or schema and it does not overwrite the record it only creates record when it does not contain that record
mongoose.model('users',userSchema);