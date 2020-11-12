context('COMPONENTE: TaskDuration con horas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/actividades/lista');
    cy.get('[data-cy="new-task"]')
      .click();
    cy.get('[data-cy="duration-container"]')
      .click();
    cy.get('[data-cy="withHoursChk"]')
      .click({ force: true })
      .should('be.checked');
  });
  it('CALCULO FECHA FIN: Duración 2.25 y fecha inicio 2020-09-10T00:00', () => {
    cy.get('[data-cy="duration"]')
      .type(2.25);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10T00:00');
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-12T06:00');
      });
  });
  it('CALCULO FECHA INICIO: Duración 2.5 y fecha fin 2020-09-10T20:00', () => {
    cy.get('[data-cy="duration"]')
      .type(2.50);
    cy.get('[data-cy="endDate"]')
      .type('2020-09-10T20:00');
    cy.get('[data-cy="initDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-08T08:00');
      });
  });
  it('CALCULO DURACIÓN: Fecha inicio 2020-09-10T00:00 y fecha fin 2020-09-12T06:00', () => {
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10T00:00');
    cy.get('[data-cy="endDate"]')
      .type('2020-09-12T06:00');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(2.25);
      });
  });
  it('CALCULO DURACIÓN - FECHA FIN BLOQUEADA: Duración 12.5', () => {
    cy.get('[data-cy="duration"]')
      .type(3.50);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10T05:00');
    cy.get('[data-cy="endDateLockBtn"]')
      .click();
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-13T17:00');
      });
    cy.get('[data-cy="initDate"]')
      .type('2020-09-01T05:00');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(12.5);
      });
  })
  it('CALCULO DURACIÓN - FECHA INICIO BLOQUEADA: Duración 10.25', () => {
    cy.get('[data-cy="duration"]')
      .type(2.50);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10T05:00');
    cy.get('[data-cy="initDateLockBtn"]')
      .click();
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-12T17:00');
      });
    cy.get('[data-cy="endDate"]')
      .type('2020-09-20T11:00');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(10.25);
      });
  })
})
