const express = require("express"),
  morgan = require("morgan");

const app = express();

const favoriteMovies = [
  {
    title: "Boondock Saints",
    director: "Troy Duffy",
  },
  {
    title: "The Chronicles of Riddick",
    director: "David Twohy",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
  },
  {
    title: "O Brother, Where Art Thou?",
    director: "Joel Coen",
  },
  {
    title: "Austin Powers",
    director: "Jay Roach",
  },
  {
    title: "Kingsman",
    director: "Matthew Vaughn",
  },
  { title: "Gladiator", director: "Ridley Scott" },
  {
    title: "300",
    director: "Zack Snyder",
  },
  { title: "Moneyball", director: "Bennett Miller" },
  { title: "The Skorpion King", director: "Chuck Russell" },
];

app.use(express.static("public"));

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Here is my Favorite Movies List");
});

app.get("/movies", (req, res) => {
  res.send(favoriteMovies);
});
app.get("/secreturl", (req, res) => {
  res.send("This is a secret URL");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
