// context('Verificar lista recursiva', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:8080/actividades/lista');
//   })
//   it('EXISTENCIA DEL COMPONENTE', () => {
//     cy.get('[data-cy="treeNodes"]').should('exist');
//   })
//   it('MOSTRAR SUB ACTIVIDADES', () => {
//     cy.get('[data-cy="treeNodes"]')
//       .find('[data-cy="treeNodeSlot"]')
//       .should('exist')
//       .eq(0)
//       .click()
//       .parent()
//       .parent()
//       .should('have.class', 'node-container-wrapper')
//       .children('.node')
//       .should('exist')
//       .should('have.class', 'node')
//       .should('have.attr', 'style', 'display: none;')
//       .parent()
//       .click()
//       .should('have.class', 'node-container-wrapper')
//       .children('.node')
//       .should('have.attr', 'style', '');
//   })
// });