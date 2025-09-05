const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userschema = new schema({
    email: {
        type: String,
        required: true
    }
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
