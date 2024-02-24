const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get('/', (req, res)=>{
  res.send("OAuth backend")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
