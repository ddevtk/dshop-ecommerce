const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

const port = process.env.PORT;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));
