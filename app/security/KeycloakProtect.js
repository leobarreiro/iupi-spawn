var session = require('express-session');
var Keycloak = require('keycloak-connect');
var kconf = require('../config/keycloak.json');

let _keycloak;

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } else {
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, kconf);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please call init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};