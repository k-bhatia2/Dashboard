const express = require('express')
const app = express();
const port = 8000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
