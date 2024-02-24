// const express = require("express");
// require("dotenv").config();

// const authRoutes = require("./routes/auth.routes");

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// app.use("/auth", authRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
