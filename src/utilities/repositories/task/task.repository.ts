import { TaskEntity } from './../../entities/task/task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from 'src/utilities/dtos/tasks/create-task.dto';
import { TaskStatus } from 'src/utilities/types/task/task-status.enum';
import { TaskQueryFilterDto } from 'src/utilities/dtos/tasks/task-query-filter.dto';
import { UserEntity } from 'src/utilities/entities/user/user.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(
    filterQuery: TaskQueryFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterQuery;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto; // get the task data which is cared by task DTO

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    // time to save
    await task.save();

    // prevent the task author from be returning back when task been created.
    delete task.user;

    // return the task back:
    return task;
  }
}
