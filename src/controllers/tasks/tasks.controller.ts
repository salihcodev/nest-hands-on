import { CreateTaskDto } from './../../dtos/tasks/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from 'src/services/tasks/tasks.service';
import { TaskModel, TaskStatus } from '../../models/tasks/task.model';
import { TaskQueryFilterDto } from 'src/dtos/tasks/task-query-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(@Query() filterQuery: TaskQueryFilterDto): TaskModel[] {
    if (Object.keys(filterQuery).length) {
      return this.tasksService.getTasksWithFilter(filterQuery);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskViaId(@Param('id') id: string): TaskModel {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): TaskModel {
    return this.tasksService.updateTaskState(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
