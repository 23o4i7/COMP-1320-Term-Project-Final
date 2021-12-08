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
  const inputData = req.body;
  const userObj = {
    id: generateID(),
    fullName: inputData["fullName"],
    aboutMe: inputData["aboutMe"], //(inputData["aboutMe"].split(". ")).map(sentence => sentence + "."),
    knownTechnologies: Object.keys(inputData).slice(2, -3),
    githubUrl: inputData["githubUrl"],
    twitterUrl: inputData["twitterUrl"],
    favoriteBooks: inputData["favoriteBooks"].split(", "), // Seperate author and title
  };
  console.log(userObj)
  res.render("homepage", { userObj: userObj });
  // fsP.readFile("database.json", "utf-8")
  //   .then(content => JSON.parse(content))
  //   .then(parsedContent => JSON.stringify(parsedContent))
  //   .then(jsonString => `${jsonString.substring(0, (jsonString.length - 2))},\n${JSON.stringify(userObj)}]}`)
  //   .then(data => fsP.writeFile("database.json", data))
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});

const generateID = () => {
  let id = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let index = 0; index < 5; index++) {
    id += characters.charAt(Math.floor(Math.random()*characters.length));
  }
  return id;
}