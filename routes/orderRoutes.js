const express = require('express');
const dotenv = require('dotenv');
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
      amount: totalPrice * 100,
      currency: 'vnd',
      customer: customer.id,
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  console.log(payment);

  if (payment) {
    res.status(200).json({ message: 'Payment successfully 🎉🎉🎉' });
  } else {
    res.status(400).json({ message: 'Payment failed 🙅‍♂️🙅‍♂️🙅‍♂️' });
  }
});

module.exports = router;
