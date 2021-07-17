const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../model/productModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_NAME.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Collection Successfully'));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/product-data.json`),
  'utf-8'
);
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Import data successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Delete data successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
