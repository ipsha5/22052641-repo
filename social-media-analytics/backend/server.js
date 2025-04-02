const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable cross-origin requests

app.get("/evaluation-service/users", (req, res) => {
    res.json({ users: [{ id: 1, name: "Agrasth" }] });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
