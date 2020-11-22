import { buildHierarchy } from '../../../lambda/helpers';

describe('BACKEND: tareas en Jerarquía', () => {
  it.only('Varios productos', () => {
    cy.fixture('hierarchyData').then(({ tasks }) => {
      const result = buildHierarchy(tasks);
      expect(result).to.be.instanceOf(Array);
      expect(result[0].id).to.be.equal(1);
      expect(result[0].subTasks[1].id).to.be.equal(2);
    })
  })
});
