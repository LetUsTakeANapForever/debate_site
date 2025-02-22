const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
// convert data into JSON format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
// static file
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  // check if a user already exists in the DB
  const existingUser = await collection.findOne({ username: data.username });

  if (existingUser) {
    res.send(`
        <script>
            alert("Error: Username has been used. Please try a different username.");
            window.location.href = "/signup";
        </script>
    `);
  } else {
    // hash password using bcrypt
    const saltRounds = 10; //Number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);

    res.send(`<script>
      alert("Successfully signed up!");
      window.location.href = "/signup";
      </script>`);
  }
});

//Login user
app.post("/login", async (req, res) => {
  try {
    const exist = await collection.findOne({ username: req.body.username });

    if (!exist) {
      return res.send(`<script>
        alert("Username isn't found.");
        window.location.href = "/";
        </script>`);
    }

    // compare hashed password from DB with the plain text
    const doesMatch = await bcrypt.compare(req.body.password, exist.password);

    if (doesMatch) {
      res.render("home");
    } else {
      res.send(`<script>
        alert("Wrong password.");
        window.location.href = "/";
        </script>`);
    }
  } catch {
    res.send("Error found, try again.");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
