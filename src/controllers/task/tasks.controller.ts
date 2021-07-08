import { TaskEntity } from 'src/utilities/entities/task/task.entity';
import { TaskStatusValidatorPipe } from '../../utilities/pipes/task/task-status-validator.pipe';
import { CreateTaskDto } from '../../utilities/dtos/tasks/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from 'src/services/task/tasks.service';
import { TaskStatus } from '../../utilities/types/task/task-status.enum';
import { TaskQueryFilterDto } from 'src/utilities/dtos/tasks/task-query-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utilities/custom-decorators/getUser.decorator';
import { UserEntity } from 'src/utilities/entities/user/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(
    @Query() filterQuery: TaskQueryFilterDto,
    @GetUser() user: UserEntity,
  ): any {
    return this.tasksService.getTasks(filterQuery, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatorPipe) status: TaskStatus,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskState(id, status, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
