
context('Verificar barra de navegación', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/actividades/lista');
  });
  it('VERSIÓN WEB.', () => {
    cy.get('[data-cy="navBar"]')
      .should('exist');
    cy.get('[data-cy="navBar"]').then((el) => {
      const [nav] = el;
      const { tagName } = nav;
      expect(tagName).to.equal('NAV');
    });
  });
  it('NO EXISTE BOTÓN MENÚ EN PANTALL WEB', () => {
    cy.viewport(1000, 660)
    cy.get('[data-cy="activatorMovilMenu"]')
      .should('not.be.visible')
    cy.get('.dl-menu-movil')
      .should('not.contain', 'dl-show-menu-movil');
  })
  it('EXISTE BOTÓN MENÚ EN PANTALLA MÓVIL', () => {
    cy.viewport(450, 500)
    cy.get('[data-cy="activatorMovilMenu"]')
      .should('be.visible');
  })
  it('ABRIR Y CERRAR MENÚ MÓVIL', () => {
    cy.viewport(450, 500);
    cy.get('.dl-menu-movil')
      .should('not.contain', 'dl-show-menu-movil');
    cy.get('[data-cy="activatorMovilMenu"]')
      .click();
    cy.get('.dl-menu-movil')
      .should('have.class', 'dl-show-menu-movil');
    cy.get('[data-cy="closeMovilMenu"]')
      .click()
    cy.get('.dl-menu-movil')
      .should('not.contain', 'dl-show-menu-movil');
  })
})