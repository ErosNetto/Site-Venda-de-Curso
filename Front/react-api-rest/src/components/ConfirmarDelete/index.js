import React from 'react';

import { Container, Botoes } from './style';

export default function ConfirmarDelete() {
  return (
    <Container>
      <div className="div">
        <h2>Tenceteza?</h2>
        <Botoes>
          <button type="button">Encerrar agora</button>
          <button type="button">Cancelar</button>
        </Botoes>
      </div>
    </Container>
  );
}
