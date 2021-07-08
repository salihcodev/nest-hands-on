import { TaskQueryFilterDto } from '../../utilities/dtos/tasks/task-query-filter.dto';
import { CreateTaskDto } from '../../utilities/dtos/tasks/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../../utilities/types/task/task-status.enum';
import { TaskRepository } from 'src/utilities/repositories/task/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/utilities/entities/task/task.entity';
import { UserEntity } from 'src/utilities/entities/user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(
    filterQuery: TaskQueryFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterQuery, user);
  }

  // get task via id:
  async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findOne({
      where: {
        userId: user.id,
        id,
      },
    });

    if (!foundTask) {
      throw new NotFoundException(
        `There's no tasks corresponding to provided id (${id}) !`,
      );
    }

    return foundTask;
  }

  // create a task:
  createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // delete task:
  async deleteTask(id: number, user: UserEntity): Promise<void> {
    const deletedTask = await this.taskRepository.delete({
      id,
      userId: parseInt(user.id),
    });

    if (deletedTask.affected === 0) {
      throw new NotFoundException(
        `There's no tasks corresponding to provided id (${id}) !`,
      );
    }
  }

  async updateTaskState(
    id: number,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const taskToUpdate = await this.getTaskById(id, user);
    taskToUpdate.status = status;
    await taskToUpdate.save();

    return taskToUpdate;
  }
}
