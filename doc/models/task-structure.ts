type ID = string;
type TaskID = string;
type UserID = string;
enum TaskStatus {
  fin = 'FIN',
  pendiente = 'PENDIENTE',
  proceso = 'PROCESO',
  cancelado = 'CANCELADO',
  retrasado = 'RETRASADO',
}
interface TaskProgress<Type> {
  done: Type,
  total: Type,
}
interface TaskTime {
  endDate: Date,
  duration: number,
  initDate: Date,
}
enum TaskRelatedConditions {
  finfin = 'EE',
  fininicio = 'ES',
  inicioinicio = 'SS',
  iniciofin = 'SE'
}

interface TaskRelated {
  condition: TaskRelatedConditions,
  id: TaskID,
}

interface TaskCheckList {
  title: string,
  done: boolean,
}

interface Budget {
  amount: number,
  currencyCode: string,
}

interface Expense {
  amount: number,
  currencyCode: string,
  title: string,
}
interface Balance {
  amount: number,
  currencyCode: string,
}

type Task = {
  /* a quién está asignada la actividad*/
  assignedId: UserID,
  /* factor de balance económico de la actividad gastado / presupuestado*/
  balance: Balance,
  /* presupuesto asignado a la actividad*/
  budget: Budget,
  /* checklist de actividades requeridas para completar la actividad*/
  checkList: Array<TaskCheckList>
  /* comentarios a realizar sobre la actividad*/
  comments: Array<string>,
  /* compañía a la que pertenece la actividad */
  companyId: string,
  /* gastos relacionados a la actividad*/
  expenses: Array<Expense>,
  /* flag para saber que no existen subactividades, solo checklist*/
  flagSimpleTask: boolean,
  id: TaskID,
  /* etiquetas agregadas a la actividad*/
  labels: Array<string>,
  /* enlaces agregados a la actividad*/
  links: Array<string>,
  /* nombre de la actividad*/
  name: string,
  /* actividad a la que pertenece*/
  parentTaskId: TaskID,
  /* progeso de la actividad. Está relacionado con checklist*/
  progress: TaskProgress<number>,
  /* atividades relacionadas (GANTT)*/
  relatedTasks: Array<TaskRelated>,
  /* monto que representa la sumatoria de gastos*/
  spent: number,
  /* estado de la actividad: CANCELADO, EJECUCION, FIN, PENDIENTE, RETRASADO*/
  status: TaskStatus,
  /* sub-actividades: Al complemtarse las subactividades finaliza la actividad */
  subTasks: [TaskID]
  /* tiempo de vida de la actividad*/
  time: TaskTime,
}
