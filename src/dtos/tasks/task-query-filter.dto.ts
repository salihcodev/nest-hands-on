import { TaskStatus } from 'src/models/tasks/task.model';

export class TaskQueryFilterDto {
  status: TaskStatus;
  search: string;
}
