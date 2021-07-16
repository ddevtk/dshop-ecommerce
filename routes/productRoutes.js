const express = require('express');
const Product = require('../model/productModel');

const router = express.Router();

router.get('/products', async (req, res) => {
  Product.find({}, (err, doc) => {
    if (!err) {
      return res.send(doc);
    }
    return res
      .status(400)
      .json({ status: 'error', message: 'Some thing went wrong' });
  });
});
router.get('/products/:id', async (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (!err) {
      return res.send(doc);
    }
    return res
      .status(400)
      .json({ status: 'error', message: 'Some thing went wrong' });
  });
});

module.exports = router;
