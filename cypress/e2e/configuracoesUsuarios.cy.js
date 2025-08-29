describe('Atualização de dados do usuario', () => {
  const novoDadosUsuario = {
    nome: 'alice',
    senha: '123456',
  };
  it('Deve permitir usuario aleterar informaçõs', () => {
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then((usuario) => {
      cy.login(usuario[0].email, usuario[0].senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.getByData('titulo-boas-vindas').should(
        'contain',
        'Bem vindo de volta!'
      );
      cy.contains(usuario[0].nome).should('be.visible');

      cy.getByData('app-home').find('a').eq(1).click();
      cy.url().should('include', '/minha-conta');

      cy.getByData('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name = "nome"]').type(novoDadosUsuario.nome);
      cy.get('[name = "senha"]').type(novoDadosUsuario.senha);

      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
      cy.getByData('botao-salvar-alteracoes').click();

      cy.on('window:alert', (textoDoAlerta) => {
        expect(textoDoAlerta).to.equal('Alterações salvas com sucesso!');
        cy.url().should('include', '/home');
      });

      cy.window().then((win) => {
        expect
          .win(localStorage.getItem('nomeUsuario'))
          .toEqual(novoDadosUsuario.nome);

        cy.request('GET', `http://localhost:8000/users/${userId}`).then(
          (resposta) => {
            expect(resposta.status).to.eq(200);
            expect(resposta.body.nome).to.be.equal(novoDadosDeUsuario.nome);
            expect(resposta.body.senha).to.be.equal(novoDadosDeUsuario.senha);
          }
        );
      });
    });
  });
});
