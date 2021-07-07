import { TaskQueryFilterDto } from '../../utilities/dtos/tasks/task-query-filter.dto';
import { CreateTaskDto } from '../../utilities/dtos/tasks/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../../utilities/types/task/task-status.enum';
import { TaskRepository } from 'src/utilities/repositories/task/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/utilities/entities/task/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterQuery: TaskQueryFilterDto): any {
    return this.taskRepository.getTasks(filterQuery);
  }

  // get task via id:
  async getTaskById(id: number): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(
        `There's no tasks corresponding to provided id (${id}) !`,
      );
    }

    return foundTask;
  }

  // create a task:
  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // delete task:
  async deleteTask(id: number): Promise<void> {
    const deletedTask = await this.taskRepository.delete(id);

    if (deletedTask.affected === 0) {
      throw new NotFoundException(
        `There's no tasks corresponding to provided id (${id}) !`,
      );
    }
  }

  async updateTaskState(id: number, status: TaskStatus): Promise<TaskEntity> {
    const taskToUpdate = await this.getTaskById(id);
    taskToUpdate.status = status;
    await taskToUpdate.save();

    return taskToUpdate;
  }
}
