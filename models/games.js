const mongoose = require("mongoose");


const gamesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
