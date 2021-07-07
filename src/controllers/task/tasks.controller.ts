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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterQuery: TaskQueryFilterDto): any {
    return this.tasksService.getTasks(filterQuery);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatorPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskState(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
