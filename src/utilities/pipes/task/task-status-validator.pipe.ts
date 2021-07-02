import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../../types/task/task-status.enum';

export class TaskStatusValidatorPipe implements PipeTransform {
  readonly allowedTaskStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.CLOSED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`(${value}) is not valid status.`);
    } else {
      return value;
    }
  }

  private isStatusValid(status: any) {
    const idx = this.allowedTaskStatus.indexOf(status);
    return idx !== -1;
  }
}
