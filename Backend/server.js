const express = require("express");
const mongoose = require("mongoose");
const Snippet = require("./snippet");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const user = await Snippet.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/snippet", async (req, res) => {
  try {
    const { search } = req.query;
    if (search == undefined) {
      res.status(400).json({ message: "Enter the search field" });
    }

    const search_snippet = await Snippet.find({ keyword: search });
    res.status(200).json({ snippet: search_snippet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const newSnippet = await Snippet.create({
      keyWord: req.body.keyword,
      type: req.body.type,
      snippet: req.body.snippet,
    });
    res.status(200).json(newSnippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch("/edit/:id", async (req, res) => {
  try {
    const existing_snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { snippet: req.body.snippet },
      {
        new: true,
      },
    );
    res
      .status(200)
      .json({ message: "Update successfully", snippet: existing_snippet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const delete_snippet = await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: "Delete successfully", snippet: delete_snippet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
mongoose
  .connect("mongodb://localhost:27017/Snippets")
  .then(() => {
    console.log("db Connected");

    app.listen(3000, (req, res) => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Error");
  });
