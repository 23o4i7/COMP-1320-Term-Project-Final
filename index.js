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

app.get("/people", (req, res) => {
  res.render("people");
});

app.post("/createuser", (req, res) => {
  const inputData = req.body;
  const userObj = {
    id: 12345,//inputData["userID"],
    fullName: inputData["fullName"],
    aboutMe: inputData["aboutMe"], //(inputData["aboutMe"].split(". ")).map(sentence => sentence + "."),
    knownTechnologies: Object.keys(inputData).slice(2, -3),
    githubUrl: inputData["githubUrl"],
    twitterUrl: inputData["twitterUrl"],
    favoriteBooks: inputData["favoriteBooks"].split(", "), // Seperate author and title?
  };
  fsP.readFile("database.json", "utf-8")
    .then(content => JSON.parse(content))
    .then(parsedContent => JSON.stringify(parsedContent))
    .then(jsonString => `${jsonString.substring(0, (jsonString.length - 2))},\n${JSON.stringify(userObj)}]}`)
    .then(data => fsP.writeFile("database.json", data))
    // fix this
    .then(
      fsP.readFile("database.json", "utf-8")
        .then(data => JSON.parse(data))
        .then(data => data["users"].filter(user => user.id == userObj["id"])[0])
        .then(userObj => res.render("homepage", { userObj: userObj }))
)});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  fsP.readFile("database.json", "utf-8")
  .then(data => JSON.parse(data))
  .then(data => data["users"].filter(user => user.id == id)[0])
  .then(userObj => res.render("homepage", { userObj: userObj }))
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});