const User = require ('../models/userModel');
const asyncHandler = require ('express-async-handler');
const generateToken = require('../utils/generateToken')


const registerUser = asyncHandler (async (req, res) => {
  const {name, email, password, pic} = req.body;
  const userExits = await User.findOne ({email});
  if (userExits) {
    res.status (404);
    throw new Error ('User already Exits');
  } else {
    const user = await User.create ({name, email, password, pic});
    res.status (201).json ({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,      
      token:generateToken(user._id)
    });
  }

});


const authUser  = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:generateToken(user._id)
     }) 
    }else{
      res.status(400);
      throw new Error ('Invalid emailID or password');
    }
    
  });


  const userProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if(req.body.password) {
        user.password = req.body.password;
      }
      console.log(user);

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })

    }else{
      res.status(404);
      throw new Error ('User not found');      
    }
  })

module.exports = {registerUser,authUser,userProfile};
