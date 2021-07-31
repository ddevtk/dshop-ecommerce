const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productsRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoutes');
const bodyParser = require('body-parser');

dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DB_NAME.replace('<password>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

app.use(bodyParser.json());

app.use('/api', productsRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

if (process.env.NODE_ENV) {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`));
