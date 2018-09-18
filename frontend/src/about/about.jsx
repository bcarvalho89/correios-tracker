import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div>
        <h2>Jaiminho é um projeto desenvolvido para rastrear encomendas através dos correios de uma forma rápida e fácil.</h2><br/>
        <p>Utilizamos o webservice dos correios para obter as informações e as mesmas não são armazenadas.</p><br/>
        <p><strong>Dica: Você pode adicionar a url gerada na consulta em seus favoritos ;)</strong></p>
      </div>
    )
  }
}
