const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
                                        //find by email first argument, update name and picture, optional third, it will argument the updated information
  const user = await User.findOneAndUpdate(
    { email }, 
    { name: email.split('@')[0], picture }, 
    { new: true }
  );
  
  if (user) {
    console.log('User updated', user);
     res.json(user);
  } else { 
    const newUser = await new User({
      email, 
      name: email.split('@')[0], 
      picture,
    }).save();
    console.log('User created', newUser);
    res.json(newUser);
  }
};


