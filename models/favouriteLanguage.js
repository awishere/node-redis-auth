const mongoose = require("mongoose");


const favouriteSchema = new mongoose.Schema(
  {
    language: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Language'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
  },
);

const FavouriteLanguage = mongoose.model("FavouriteLanguage", favouriteSchema);

module.exports = FavouriteLanguage;
