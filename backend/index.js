const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
})
