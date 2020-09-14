context('COMPONENTE: TaskDuration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/actividades/lista');
    cy.get('[data-cy="new-task"]')
      .click();
    cy.get('[data-cy="duration-container"]')
      .click();
  });
  it('ESTABLECER DURACIÓN: NO FECHAS', () => {
    cy.get('[data-cy="duration"]')
      .type(2);
    cy.get('[data-cy="initDate"]')
      .should('be.empty');
    cy.get('[data-cy="endDate"]')
      .should('be.empty');
  })
  it('CALCULO FECHA FIN: ESTABLECER DURACIÓN Y FECHA INICIO', () => {
    cy.get('[data-cy="duration"]')
      .type(2);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-13');
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-15');
      });
  });
  it('CALCULO FECHA INICIO: ESTABLECER DURACIÓN Y FECHA FIN', () => {
    cy.get('[data-cy="duration"]')
      .type(3);
    cy.get('[data-cy="endDate"]')
      .type('2020-09-13');
    cy.get('[data-cy="initDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-10');
      });
  })
  it('RECALCULO FECHA FIN: CAMBIO EN DURACIÓN Y FECHA INICIO EXISTE', () => {
    cy.get('[data-cy="duration"]')
      .type(2);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-13');
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-15');
    });
    cy.get('[data-cy="duration"]')
      .focus()
      .clear()
      .type(0)
      .type(3);
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-16');
    });
  })
  it('CALCULO DE DURACIÓN: FECHA INICIO + FECHA FIN EXISTEN', () => {
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10');
    cy.get('[data-cy="endDate"]')
      .type('2020-09-15');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(5);
      });
  })
  it('CALCULO FECHA INICIAL: BLOQUEO FECHA FIN Y MODIFICACIÓN DURACIÓN', () => {
    cy.get('[data-cy="duration"]')
      .type(3);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-12');
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-15');
      });
    cy.get('[data-cy="endDateLockBtn"]')
      .click();
    cy.get('[data-cy="duration"]')
      .focus()
      .clear()
      .type(0)
      .type(5);
    cy.get('[data-cy="initDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-10');
      })
  })
  it('RECALCULO DURACIÓN: FECHAS BLOQUEADAS, TODO EXISTE, SE MODIFICA FECHA INICIO Y LUEGO FECHA FIN', () => {
    cy.get('[data-cy="duration"]')
      .type(3);
    cy.get('[data-cy="initDate"]')
      .type('2020-09-12');
    cy.get('[data-cy="initDateLockBtn"]')
      .click();
    cy.get('[data-cy="endDate"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain('2020-09-15');
      });
    cy.get('[data-cy="endDateLockBtn"]')
      .click();
    cy.get('[data-cy="initDate"]')
      .type('2020-09-10');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(5);
      });
    cy.get('[data-cy="endDate"]')
      .type('2020-09-20');
    cy.get('[data-cy="duration"]')
      .should(($el) => {
        const el = $el[0];
        expect(el.value).to.contain(10);
      });
  })
})