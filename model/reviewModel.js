const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = reviewSchema;
