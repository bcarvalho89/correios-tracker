import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const objects = props.match.params.objects;

    if (!objects) {
      return <div>Nenhum objeto encontrado</div>
    }
    return (
      <div>
        <h1>{objects}</h1>
        <Link to='/'>Voltar</Link>
      </div>
    )
};
