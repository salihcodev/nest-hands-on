import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../../types/task/task-status.enum';

export class TaskQueryFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.CLOSED])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
