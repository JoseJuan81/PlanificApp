type ID = string;
enum TaskStatus {
  fin = 'FIN',
  pendiente = 'PEND',
  proceso = 'PROCE',
  cancelado = 'CANC',
  retrasado = 'RETRA',
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
  id: ID,
}
interface Task {
  asigned: ID,
  balance: number,
  budget: number,
  children: Array<ID>,
  comments: Array<string>,
  expenses: Array<string>,
  flagMaster: boolean,
  flagSimpleTask: boolean,
  id: ID,
  labels: Array<string>,
  links: Array<string>,
  name: string,
  parentTaskId: ID,
  progress: TaskProgress<number>,
  relatedTasks: Array<TaskRelated>,
  spent: number,
  status: TaskStatus,
  time: TaskTime,
}