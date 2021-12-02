const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fsP = require("fs").promises;

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.get("/people/:id", (req, res) => {
  res.render("people");
});

// app.get("/createuser", (req, res) => {
//   res.render("people");
//   const idObj = '{"id": "testuser"}';
//   fsP.readFile("database.json", "utf-8")
//     .then(content => JSON.parse(content))
//     .then(parsedContent => JSON.stringify(parsedContent))
//     .then(jsonString => `${jsonString.substring(0, (jsonString.length - 2))},\n${idObj}]}`)
//     .then(data => fsP.writeFile("database.json", data))
// });

app.post("/54az3", (req, res) => {
  res.render("homepage");
  const inputData = req.body;
  const userObj = JSON.stringify({
    id: "12345", // generate random string
    fullName: inputData["name"],
    aboutMe: inputData["about"],
    knownTechnologies: Object.keys(inputData).slice(2, -4),
    githubUrl: inputData["github"],
    twitterUrl: inputData["twitter"],
    favoriteBooks: inputData["books"].split(","),
    favoriteArtists: inputData["artists"].split(",")
  });
  fsP.readFile("database.json", "utf-8")
    .then(content => JSON.parse(content))
    .then(parsedContent => JSON.stringify(parsedContent))
    .then(jsonString => `${jsonString.substring(0, (jsonString.length - 2))},\n${userObj}]}`)
    .then(data => fsP.writeFile("database.json", data))
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});