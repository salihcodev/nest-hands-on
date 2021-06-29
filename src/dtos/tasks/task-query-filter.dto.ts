import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/models/tasks/task.model';

export class TaskQueryFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.CLOSED])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
