const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "g2",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("User registered:", result.insertId);
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        console.error("Error retrieving user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const user = result[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        "secretKey"
      );
      res.json({ token });
    }
  );
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "You are logged in" });
});

app.post("/users", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }
  const query = "INSERT INTO users (username, email) VALUES (?, ?)";
  connection.query(query, [username, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to Add User" });
    }
    res.json({ message: "User Added Successfully" });
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT id, username, email FROM users";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to Retrieve Users" });
    }
    res.json(rows);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }
  const query = "UPDATE users SET username=?, email=? WHERE id = ?";
  connection.query(query, [username, email, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to Update User" });
    }
    res.json({ message: "User Updated Successfully" });
  });
});

// Spotify API credentials
const CLIENT_ID = "d109e01fc4bb4ad8836d75db50eedd7c";
const CLIENT_SECRET = "165536612e534bbfb434d14f956178a4";

// Route to handle search
app.get("/search", async (req, res) => {
  try {
    // Get access token using client credentials
    const accessTokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    // Extract access token from response
    const accessToken = accessTokenResponse.data.access_token;

    // Make a GET request to the Spotify API using the obtained access token
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: req.query.q,
        type: "track",
      },
    });

    // Send the response received from Spotify API back to the client
    res.json(response.data);
  } catch (error) {
    // If there's an error, log it and send an internal server error response
    console.error("Error searching tracks on Spotify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle fetching artist's top tracks
// app.get("/top-tracks", async (req, res) => {
//   try {
//     // Get access token using client credentials
//     const accessTokenResponse = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       null,
//       {
//         params: {
//           grant_type: "client_credentials",
//         },
//         auth: {
//           username: CLIENT_ID,
//           password: CLIENT_SECRET,
//         },
//       }
//     );

//     // Extract access token from response
//     const accessToken = accessTokenResponse.data.access_token;

//     // Make a GET request to the Spotify API using the obtained access token
//     const response = await axios.get("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         country: 'US' // Specify the country for which you want to get the top tracks
//       },
//     });

//     // Send the response received from Spotify API back to the client
//     res.json(response.data);
//   } catch (error) {
//     // If there's an error, log it and send an internal server error response
//     console.error("Error fetching artist's top tracks on Spotify:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// Spotify API credentials
// const BEARER_TOKEN =
//   "BQBIQnU9VmBE2UmuElNL0fpbViAbAtUQxBMPbdmr50L0OBfRUXaYR-mdJWB_E_-OUv03cqDnmS67g6neKExXOJUIp9bBAtGVsxzcQIUtyL_m_s4WZdoslaETpbvnJtm4m0hDKCbsTj_2d7F6Rpzudnbdg_-tRjrLAirSOTv0ErQwgPFBcV4XZHObepNBH0rGoEPMB7tl6jDo_RkAUqF-xUa29p1cRyl4Hiq1T2gUspkUe7vL0e6kvsuAhtOZAtQvLy-MUL6kO1beaAneLxy5a3W_otN1QvoOhtsKWZ9yQSqmk2VIM_sdxffrmVBt-0lEjMY8aHYnN8bozVpRJqNKq0o";

// // Endpoint to search for tracks on Spotify
// app.get("/search", async (req, res) => {
//   try {
//     const response = await axios.get("https://api.spotify.com/v1/search", {
//       headers: {
//         Authorization: `Bearer ${BEARER_TOKEN}`,
//       },
//       params: {
//         q: req.query.q,
//         type: "track",
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error searching tracks on Spotify:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Endpoint to fetch top artists from Spotify
// Endpoint to fetch playlist
app.get('/playlist', async (req, res) => {
  try {
    // Get access token using client credentials
    const accessTokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      null,
      {
        params: {
          grant_type: 'client_credentials',
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    // Extract access token from response
    const accessToken = accessTokenResponse.data.access_token;

    // Fetch playlist data from Spotify API
    const playlistId = '3cEYpjA9oz9GiPac4AsH4n'; // Your playlist ID
    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Send playlist data to frontend
    res.json(playlistResponse.data);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/artist/:id", async (req, res) => {
  try {
    const artistId = req.params.id;
    
    // Get access token using client credentials
    const accessTokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    // Extract access token from response
    const accessToken = accessTokenResponse.data.access_token;

    // Make a GET request to the Spotify API using the obtained access token
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Send the artist information received from Spotify API back to the client
    res.json(response.data);
  } catch (error) {
    // If there's an error, log it and send an internal server error response
    console.error("Error fetching artist information from Spotify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Socket.IO connection handler
let messages = [];

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// app.post("/api/messages", (req, res) => {
//   const newMessage = req.body;
//   messages.push(newMessage);
//   res.sendStatus(200);
// });

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("User connected");

  // Load messages from the database when a user connects
  connection.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      throw err;
    }
    socket.emit("load messages", results);
  });

  // Handle incoming chat messages
  socket.on("chat message", (data) => {
    // Emit the message to all connected clients
    io.emit("chat message", data);

    // Check if track_id is present
    if (data.track_id) {
      // Insert the message into the database with track_id
      connection.query(
        "INSERT INTO messages (message, username, track_id) VALUES (?, ?, ?)",
        [data.text, data.username, data.track_id],
        (err, result) => {
          if (err) {
            console.error("Error inserting message with track_id:", err);
          } else {
            console.log("Message with track_id inserted");
          }
        }
      );
    } else {
      // Handle the case where track_id is missing
      // You can choose to log this, or insert the message with a null track_id
      console.log("Notice: track_id is missing for a message");
      // Optional: Insert the message into the database without track_id
      connection.query(
        "INSERT INTO messages (message, username) VALUES (?, ?)",
        [data.text, data.username],
        (err, result) => {
          if (err) {
            console.error("Error inserting message without track_id:", err);
          } else {
            console.log("Message without track_id inserted");
          }
        }
      );
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// express

server.listen(port, () => {
  console.log(`Socket.IO server is running on http://localhost:${port}`);
});
