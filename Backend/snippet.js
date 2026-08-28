const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema({
  keyWord: { type: String, unique: true },
  type: {
    type: String,
    enum: [
      "Mongodb",
      "Express",
      "React",
      "Node",
      "Git",
      "HTML",
      "CSS",
      "Javascript",
    ],
  },
  snippet: { type: String, unique: true },
});

const User = mongoose.model("Snippets", snippetSchema);

module.exports = User;
