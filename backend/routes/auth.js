const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//REGISTRATION
router.post('/register', async(req,res) => {
   
    try {
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new use with hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and response
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.send("Error "+ error)
    }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    // const user1 = user.save();
     res.status(200).json(user)
  }
   catch(error) {
   return res.send(error)
  }
});

module.exports = router;