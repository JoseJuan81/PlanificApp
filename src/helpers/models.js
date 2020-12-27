/**
 * @type {object} Budget
 * @property {number} amount - cantidad presuouestada o estimada
 * @property {string} currencyCode - tipo de moneda
 */

/**
  * @type {object} RelatedTask
  * @property {string} condition - condición de relación
  * @property {string} taskId - id de la actividad relacionada
  * @property {string} name - nombre de la actividad
  */

/**
 * @type {object} Time
 * @property {string} endDate - fecha fin de la actividad
 * @property {number} duration - duración de la actividad
 * @property {string} initDate - fecha inicio de la actividad
 */

/**
 * Actividad vacía
 * @type {Object} EmptyTask
 * @property {string} asigned - a quién está asignada
 * @property {Budget} budget - Presupuesto estimado
 * @property {array} checkList - Listado de actividades o check list
 * @property {string} comments - comentarios sobre la actividad
 * @property {array} expenses - Gastos asociados a la actividad
 * @property {array} labels - etiquetas asociadas a la actividad
 * @property {string} name - nombre de la actividad
 * @property {RelatedTask[]} relatedTasks - arreglo de actividades relacionadas
 * @property {Time} time - ejecución de la actividad
 * @property {array} subTasks - sub actividades
 */
export const emptyTask = {
  asigned: '',
  budget: {
    amount: 0,
    currencyCode: '',
  },
  checkList: [],
  comments: '',
  expenses: [],
  labels: [],
  name: '',
  relatedTasks: [{
    condition: '',
    taskId: '',
    name: '',
  }],
  time: {
    endDate: '',
    duration: 0,
    initDate: '',
  },
  subTasks: [],
};

export const some = null;
