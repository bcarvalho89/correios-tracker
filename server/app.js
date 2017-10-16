let express = require('express');
let configs = require('./configs/config');
let Tracker = require('./helpers/parser');
let HTTPStatus = require('http-status-codes');
let responses = require('./helpers/responses');

let app = express();

app.use(function(req, res, next) {
  res.setHeader('x-powered-by', configs.app_name + ' - ' + configs.app_version);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', configs.app_origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/', function(req, res) {
  return res.status(HTTPStatus.OK).json({
    status: true,
    code: HTTPStatus.OK,
    message: configs.app_name + ' - ' + configs.app_version
  });
});

app.get('/:code', function(req, res) {
  console.log(Tracker.teste);
  Tracker.request(req)
  .then(function(data) {
    let response = Tracker.parser(data);
    responses(response, HTTPStatus.OK, res);
  }).catch(function(err) {
    console.log(err);
    let messages = {};
    messages[HTTPStatus.BAD_REQUEST] = 'Código de rastreio inválido';
    messages[HTTPStatus.REQUEST_TIMEOUT] = 'Erro ao realizar conexão';
    messages[HTTPStatus.NOT_FOUND] = 'Não foram encontrados dados de rastreio para o código informado';

    let code = err.statusCode || HTTPStatus.REQUEST_TIMEOUT;

    let error = {
      status: false,
      code: code,
      message: messages[code]
    };

    responses(error, error.code, res);
  });
});

module.exports = app;