/* eslint-disable linebreak-style */
import {
  describe, expect, test, jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'cdc@cdc.com.br',
  };
  test('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });
  test.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(objetoEditora);
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  test.skip('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  test('Deve fazer uma chamada simulada ao BD', () => {
    const editora = new Editora(objetoEditora);
    editora.salvar = jest.fn().mockReturnValue({
      id: 1,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'cdc@cdc.com.br',
      created_at: '2022-01-01',
      updated_at: '2022-01-01',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
