var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcryptjs');

var userschemaa=new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},

});

userschemaa.methods.encryptPassword=function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};
userschemaa.methods.validPassword=function(password)
{
	return bcrypt.compareSync(password, this.password);
};

module.exports=mongoose.model('User',userschemaa);

