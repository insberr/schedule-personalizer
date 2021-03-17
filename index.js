const express = require('express');
const app = express();

app.use(express.static('Public'));

app.get('/', (req, res) => {
	res.sendFile("/index.html", {root: __dirname});
});

app.listen(3000, () => console.log('server is up and alive!'));