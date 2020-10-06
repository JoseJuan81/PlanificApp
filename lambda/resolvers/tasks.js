module.exports.getResolvers = function getResolvers(db) {
  const resolvers = {
    Query: {
      hello: (parent, args, context) => 'Hello, world!',
      tasks: (parent, args, context) => [{
        balance: 66.66,
        budget: 1200,
        children: [23, 24],
        comments: ['Comentario 1', 'Comentario 2'],
        expenses: [34, 33],
        flagMaster: true,
        flagSimpleTask: false,
        id: 'dsfg45gdg345',
        labels: ['Etiqueta 1', 'Etiqueta 2'],
        links: ['Enlace 1', 'Enlace 2'],
        name: 'Actividad de prueba',
        parentTask: 55,
        progress: { done: 3, total: 5 },
        relatedTask: [{ condition: 'EE', id: 43 }],
        spent: 554,
        status: 'EJECUCION',
        time: { endData: '2020-10-10', duration: 3, initDate: '2020-10-07' },
      }],
    },
    Expense: {
      name: (parent, args, context) => {
        console.log('Expense', parent);
        return `Gasto ${parent}`;
      },
    },
  };
  return resolvers;
};
