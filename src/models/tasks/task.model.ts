// model structure:
export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// structure utils:
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
