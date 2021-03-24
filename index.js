const express = require('express');
const socket = require('./socket');

let Router = require('express').Router();

const _APP = express();

_APP.set('port', process.env.PORT || 3000);

const _PORT = _APP.get('port');

_APP.use(Router);
_APP.use(express.static('public'));

let Server = _APP.listen(_PORT, () => console.log(`Server on port : ${_PORT}`));

socket(Server, Router);
