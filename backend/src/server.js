const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('./database');

const app = express();

app.use(routes);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



app.listen(3333, () => {
    console.log("server rodando");
});

