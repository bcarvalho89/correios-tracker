import express from 'express';
import HTTPStatus from 'http-status-codes';

import configs from './configs/config';
import Tracker from './Tracker/Tracker';
import responses from './helpers/responses';

const app = express();

app.use((req, res, next) => {
  res.setHeader('x-powered-by', `${configs.app_name} - ${configs.app_version}`);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', configs.app_origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/', (req, res) => {
  return res.status(HTTPStatus.OK).json({
    status: true,
    code: HTTPStatus.OK,
    message: `${configs.app_name} - ${configs.app_version}`
  });
});

app.get('/:code', (req, res) => {
  Tracker.request(req)
  .then((data) => {
    let response = Tracker.parser(data);
    responses(response, HTTPStatus.OK, res);
  }).catch((err) => {
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

export default app;