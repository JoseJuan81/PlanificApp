type ID = string;
enum TaskStatus {
  fin = 'FIN',
  pendiente = 'PEND',
  proceso = 'PROCE',
  cancelado = 'CANC',
  retrasado = 'PROCE-RE',
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
interface Task {
  asigned: string,
  balance: number,
  children: Array<ID>,
  comments: Array<string>,
  expenses: Array<string>,
  flagMaster: boolean,
  flagSimpleTask: boolean,
  id: ID,
  labels: Array<string>,
  links: Array<string>,
  name: string,
  progress: TaskProgress<number>,
  relatedTasks: Array<ID>,
  spent: number,
  status: TaskStatus,
  subTaskOf: ID,
  time: TaskTime,
}