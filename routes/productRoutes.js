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

router.post('/products/addReview', async (req, res) => {
  const { productId, review, user } = req.body;
  await Product.findById(productId, (err, doc) => {
    if (err) {
      return res.status(400).json({
        message: 'Some thing went wrong',
      });
    }
    doc.reviews.push({
      userId: user._id,
      name: user.name,
      rating: review.rating,
      comment: review.review,
    });
    const rating =
      doc.reviews.map(item => item.rating).reduce((acc, cur) => acc + cur) /
      doc.reviews.length;

    doc.rating = rating.toFixed(2);

    doc.save();
  });
});
router.post('/products/delete', async (req, res) => {
  const product = await Product.findByIdAndRemove({ _id: req.body._id });
  if (product) {
    return res.send('deleted successfully');
  }
  return res.status(400).json({ message: 'Some thing went wrong' });
});
router.post('/products/add', (req, res) => {
  const { name, price, description, countInStock, image, category } = req.body;
  const product = new Product({
    name: name,
    price: parseInt(price),
    description: description,
    countInStock: parseInt(countInStock),
    image: image,
    category: category,
    review: [],
  });
  product.save(err => {
    if (err) {
      return res.status(200).json({ message: 'Some thing went wrong' });
    }
    return res.send('Product added successfully');
  });
});

module.exports = router;
