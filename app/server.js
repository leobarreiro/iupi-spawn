const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
var ConfigureRoute = require("./routes/ConfigureRoute");
 
app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var route = new ConfigureRoute(app);
route.configure();

app.listen(PORT);