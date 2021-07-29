const express = require('express');
const User = require('../model/userModel');
const router = express.Router();

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email }, (err, docs) => {
    if (docs.length > 0) {
      return res
        .status(409)
        .json({ status: 'error', message: 'Email already registered' });
    } else {
      const newUser = new User(req.body);

      newUser.save(err => {
        if (!err) {
          return res
            .status(200)
            .json({ status: 'success', message: 'User registration success' });
        } else {
          return res
            .status(400)
            .json({ status: 'error', message: 'Some thing went wrong' });
        }
      });
    }
    if (err) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Some thing went wrong' });
    }
  });
});
router.post('/login', (req, res) => {
  User.find(
    { email: req.body.email, password: req.body.password },
    (err, doc) => {
      if (doc.length > 0) {
        const user = {
          _id: doc[0]._id,
          name: doc[0].name,
          email: doc[0].email,
        };
        res.send(user);
      } else {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid credentials' });
      }
      if (err) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Some thing went wrong' });
      }
    }
  );
});

router.post('/update-profile', async (req, res) => {
  const { _id, name, email } = req.body;
  console.log(req.body);
  const user = await User.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      email: email,
    }
  );
  if (user) {
    console.log(user);
    return res.send('User profile update successfully');
  }
  return res.status(400).json({
    message: 'Email already registered',
  });
});

module.exports = router;
