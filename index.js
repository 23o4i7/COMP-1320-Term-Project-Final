const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fsP = require("fs").promises;

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/people/homepage", (req, res) => {
  res.render("homepage");
});

app.get("/", (req, res) => {
  res.render("createcard")
})

// app.post("/", (req, res) => {
//   res.render("homepage")
// })

// app.post("/create", (req, res) => {
//   const user = req.body;
//   fsP.readFile("database.json", "utf-8")
//     .then((content) => JSON.parse(content))
//     .then(jsonObj)
// })

app.post("/people/:id", (req, res) => {
  const id = "54az3"; // Get ID from URL
  fsP.readFile("database.json", "utf-8")
    .then()// Find matching database from .json
});

app.post(`/people/:id`, (req, res) => {
  res.render("people");
});

app.post("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});