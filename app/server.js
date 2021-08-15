const express = require('express');
const cors = require('cors');
var app = express();
var session = require('express-session');
const keycloak = require('./security/KeycloakProtect').initKeycloak();
var javaController = require('./controllers/JavaGeneratorController');
const { Session } = require('express-session');
const PORT = process.env.PORT || 3000;

const memoryStore = new session.MemoryStore();
const mySession = session({
    secret: 'iupi-spawn-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
});

app.use(mySession);

//app.use(keycloak.middleware());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

app.use('/java', javaController);
app.get('/', function(req, res) {
    res.send("Server is up!");
});

app.use(function(req, res, next) {
    res.end = function(body) {
      if (res.statusCode === 500) {
        next(body);
      } else {
        res.send(body);
      }
    }
  });

app.listen(PORT, function(){
    console.log('Listening at port ' + PORT);
});