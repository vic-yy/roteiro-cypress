describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  it('Marca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Terminar TP2 de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });
  it('Edita uma tarefa existente', () => {
    cy.visit('');
  

    cy.get('.new-todo')
      .type('Tarefa para editar{enter}');
  

    cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain.text', 'Tarefa para editar');
  

    cy.get('.todo-list li label')
      .dblclick();
  

    cy.get('.todo-list li.editing .edit')
      .clear()
      .type('Tarefa editada com sucesso{enter}');
  

    cy.get('.todo-list li')
      .should('not.have.class', 'editing')
      .and('contain.text', 'Tarefa editada com sucesso');
  });
  it('Remove uma tarefa existente', () => {
    cy.visit('');
  
    cy.get('.new-todo')
      .type('Tarefa para remover{enter}');
  
    cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain.text', 'Tarefa para remover');
  
    cy.get('.todo-list li .destroy')
      .invoke('show') 
      .click();
  
    cy.get('.todo-list li')
      .should('have.length', 0);
  });
  
});