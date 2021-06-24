import { TaskQueryFilterDto } from './../../dtos/tasks/task-query-filter.dto';
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

  getTasksWithFilter(filterQuery: TaskQueryFilterDto): TaskModel[] {
    const { search, status } = filterQuery;

    // get all current tasks:
    let tasks: TaskModel[] = this.getAllTasks();

    // check for search & status match and return back the results:
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find((task) => task.id === id);
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

  updateTaskState(id: string, status: TaskStatus): TaskModel {
    const taskToUpdate = this.getTaskById(id);

    taskToUpdate.status = status;
    return taskToUpdate;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task: TaskModel) => task.id !== id);
  }
}
