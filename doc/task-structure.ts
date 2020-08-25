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
interface Task {
  asigned: string,
  balance: number,
  children: Array<ID>,
  comments: Array<string>,
  duration: number,
  endDate: Date,
  expenses: Array<string>,
  flagMaster: boolean,
  flagSimpleTask: boolean,
  id: ID,
  initDate: Date,
  labels: Array<string>,
  links: Array<string>,
  name: string,
  progress: TaskProgress<number>,
  relatedTasks: Array<ID>,
  spent: number,
  status: TaskStatus,
}