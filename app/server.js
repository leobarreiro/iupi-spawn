const Keycloak = require('keycloak-connect');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
var ConfigureRoute = require("./routes/ConfigureRoute");

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use(session({
    secret: 'myLongSecret', 
    store: memoryStore,
    resave: false,
    saveUninitialized: true,
    name: 'NameOfMyApp'
}));

app.use(keycloak.middleware());

app.use(cors());
app.use(keycloak.mi)
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

var route = new ConfigureRoute(app);
route.configure();

app.listen(PORT, function(){
    console.log('Listening at port ' + PORT);
});