const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const users = [
  {
    name: "JohnDoe",
    favoriteMovies: [300],
  },
];

const favoriteMovies = [
  {
    title: "Boondock Saints",
    director: {
      name: "Troy Duffy",
      birthYear: 1971,
      biography:
        "An American filmmaker and musician known for his work on cult films.",
      deathYear: null,
    },
    movieDescription: "A cult classic about vigilante brothers in Boston.",
    genre: {
      name: "Action",
      genreDescription:
        "A genre characterized by fast-paced sequences and physical stunts.",
    },
    image: "images/boondock-saints.jpeg",
  },
  {
    title: "The Chronicles of Riddick",
    director: {
      name: "David Twohy",
      birthYear: 1955,
      biography:
        " He is known for working on science fiction-action films, most notably The Chronicles of Riddick series.",
      deathYear: null,
    },
    movieDescription:
      "A science fiction action film featuring the anti-hero Riddick.",
    genre: {
      name: "Science Fiction",
      genreDescription:
        "A genre that explores futuristic concepts and advanced technology.",
    },
    image: "images/the-chronicles-of-riddick.jpeg",
  },
  {
    title: "The Dark Knight",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      biography:
        "An English-American filmmaker known for his work on science fiction and psychological thrillers.",
      deathYear: null,
    },
    description: "A superhero film about Batman's battle with the Joker.",
    genre: {
      name: "Action",
      description:
        "A genre characterized by fast-paced sequences and physical stunts.",
    },
    image: "images/the-dark-knight.jpeg",
  },
  {
    title: "O Brother, Where Art Thou?",
    director: {
      name: "Joel Coen",
      birthYear: 1954,
      biography:
        "An American filmmaker known for his work on independent films and musicals.",
      deathYear: null,
    },
    movieDescription:
      "A comedy film set in the Great Depression, following three escaped convicts.",
    genre: {
      name: "Comedy",
      genreDescription:
        "A genre that aims to entertain and amuse the audience through humor.",
    },
    image: "images/o-brother-where-art-thou.jpeg.",
  },
  {
    title: "Austin Powers",
    director: {
      name: "Jay Roach",
      birthYear: 1962,
      biography: "An American filmmaker known for his work on comedy films.",
      deathYear: null,
    },
    movieDescription:
      "A comedy film series parodying spy movies, featuring the eccentric Austin Powers.",
    genre: {
      name: "Comedy",
      genreDescription:
        "A genre that aims to entertain and amuse the audience through humor.",
    },
    image: "images/austin-powers.jpeg",
  },
  {
    title: "Kingsman",
    director: {
      name: "Matthew Vaughn",
      birthYear: 1971,
      biography:
        "An English filmmaker known for his work on action and spy films.",
      deathYear: null,
    },
    movieDescription:
      "A spy action-comedy film about a secret organization of elite spies.",
    genre: {
      name: "Action",
      genreDescription:
        "A genre characterized by fast-paced sequences and physical stunts.",
    },
    image: "images/kingsman.jpeg",
  },
  {
    title: "Gladiator",
    director: {
      name: "Ridley Scott",
      birthYear: 1937,
      biography:
        "An English filmmaker known for his work on epic historical dramas and science fiction films.",
      deathYear: null,
    },
    movieDescription:
      "A historical epic film about a Roman general who becomes a gladiator.",
    genre: {
      name: "Action",
      genreDescription:
        "A genre characterized by fast-paced sequences and physical stunts.",
    },
    image: "images/gladiator.jpeg",
  },
  {
    title: "300",
    director: {
      name: "Zack Snyder",
      birthYear: 1966,
      biography:
        "An American filmmaker known for his work on visually stylized action films.",
      deathYear: null,
    },
    movieDescription:
      "A stylized action film depicting the Battle of Thermopylae.",
    genre: {
      name: "Action",
      genreDescription:
        "A genre characterized by fast-paced sequences and physical stunts.",
    },
    image: "images/300.jpeg",
  },
  {
    title: "Moneyball",
    director: {
      name: "Bennett Miller",
      birthYear: 1966,
      biography:
        "An American filmmaker known for his work on biographical dramas.",
      deathYear: null,
    },
    movieDescription:
      "A sports drama film about the Oakland Athletics baseball team's analytical approach to assembling a competitive team.",
    genre: {
      name: "Drama",
      genreDescription:
        "A genre that focuses on emotional and relational development of characters.",
    },
    image: "images/moneyball.jpg",
  },
  {
    title: "The Skorpion King",
    director: {
      name: "Chuck Russell",
      birthYear: 1960,
      biography:
        "An American filmmaker known for his work on fantasy and adventure films.",
      deathYear: null,
    },
    movieDescription:
      "A fantasy adventure film about a young prince who must save his kingdom.",
    genre: {
      name: "Adventure",
      genreDescription:
        "A genre characterized by exciting and often dangerous journeys.",
    },
    image: "images/the-scorpion-king.jpg",
  },
];

app.use(express.static("public"));

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Here is my Favorite Movies List");
});
//READ ENDPOINTS
//READ ENDPOINT FOR WHOLE MOVIE LIST
app.get("/movies", (req, res) => {
  res.status(200).json(favoriteMovies);
});

//READ ENDPOINT FOR SPECIFIC MOVIE BY TITLE
app.get("/movies/:title", (req, res) => {
  const movieTitle = req.params.title;
  const movie = favoriteMovies.find((movie) => movie.title === movieTitle);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not listed in database");
  }
});

//READ ENDPOINT FOR GENRE BY NAME
app.get("/movies/genre/:name", (req, res) => {
  const genreName = req.params.name;
  const genre = favoriteMovies.find(
    (movie) => movie.genre.name === genreName,
  ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not listed in database");
  }
});

//READ ENDPOINT FOR DIRECTOR BY NAME
app.get("/movies/directors/:name", (req, res) => {
  const directorName = req.params.name;
  const director = favoriteMovies.find(
    (movie) => movie.director.name === directorName,
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not listed in database");
  }
});

//CREATE ENDPOINTS
//CREATE ENDPOINT FOR NEW USER REGISTRATION
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    users.push(newUser);
    res.status(201).send("User registered successfully");
  } else {
    res.status(400).send("Please provide valid user data to create profile");
  }
});

//CREATE ENDPOINT FOR ADDING MOVIE TO USER'S FAVORITE LIST
app.post("/users/:name/:title", (req, res) => {
  const userName = req.params.name;
  const movieTitle = req.params.title;

  const currentUser = users.find((user) => user.name === userName);
  if (currentUser) {
    currentUser.favoriteMovies = users.push(movieTitle);
    res.status(201).send("Movie added to favorite list");
  } else {
    res.status(400).send("User not found");
  }
});

//UPDATE ENDPOINTS
//UPDATE ENDPOINT FOR USER INFO
app.put("/users/:name", (req, res) => {
  const userId = req.params.name;
  const updatedUser = req.body;

  let user = users.find((user) => user.name === userId);

  if (user) {
    user.name = updatedUser.name;
    res.status(201).send("User info updated successfully");
  } else {
    res.status(400).send("User not found");
  }
});

//DELETE ENDPOINTS
//DELETE ENDPOINT FOR REMOVING MOVIE FROM USER'S FAVORITE LIST
app.delete("/users/:name/:title", (req, res) => {
  const userId = req.params.name;
  const movieTitle = req.params.title;

  const user = users.find((user) => user.name === userId);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle,
    );
    res.status(200).send("Movie removed from favorite list");
  } else {
    res.status(400).send("User not found");
  }
});

//DELETE ENDPOINT FOR DELETING USER PROFILE
app.delete("/users/:name", (req, res) => {
  const userId = req.params.name;

  const user = users.filter((user) => user.name !== userId);

  if (user) {
    res.status(200).send("User profile deleted successfully");
  } else {
    res.status(400).send("User not found");
  }
});
//ENDPOINT FOR LOG.TXT FILE
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
