import { CreateTaskDto } from './../../dtos/tasks/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from '../../models/tasks/task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = createTaskDto;

    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task; // just to reduce the https calls
  }
}
