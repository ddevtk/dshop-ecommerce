const express = require('express');
const dotenv = require('dotenv');
const Order = require('../model/orderModel');
const { v4: uuidv4 } = require('uuid');

dotenv.config({ path: './config.env' });

const router = express.Router();
const stripe = require('stripe')(process.env.SK_STRIPE);

router.post('/placeOrder', async (req, res) => {
  const { token, totalPrice, currentUser, cart } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
  const payment = await stripe.charges.create(
    {
      amount: totalPrice,
      currency: 'vnd',
      customer: customer.id,
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (payment) {
    const order = new Order({
      userId: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      orderItems: cart,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      totalPrice: totalPrice,
      transactionId: payment.source.id,
      isDelivered: false,
    });

    order.save(err => {
      if (err) {
        res.status(400).json({ message: 'Some thing went wrong' });
      } else {
        res.status(200).json({ message: 'Payment successfully 🎉🎉🎉' });
      }
    });
  } else {
    res.status(400).json({ message: 'Payment failed 🙅‍♂️🙅‍♂️🙅‍♂️' });
  }
});

router.post('/getOrderByUid', async (req, res) => {
  const userId = req.body._id;
  const orders = await Order.find({ userId: userId });
  if (orders) {
    return res.send(orders);
  }
  return res.status(400).json({ message: 'Some thing went wrong' });
});
router.post('/getOrderById', async (req, res) => {
  const singleOrder = await Order.find({ _id: req.body.orderId });
  if (singleOrder) {
    return res.send(singleOrder);
  }
  return res.status(400).json({ message: 'Could not find order with that ID' });
});

router.get('/getAllOrders', async (req, res) => {
  const orders = await Order.find({});
  if (orders) return res.send(orders);
  return res.status.json({ message: 'Some thing went wrong' });
});

module.exports = router;
