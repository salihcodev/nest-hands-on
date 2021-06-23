import { CreateTaskDto } from './../../dtos/tasks/create-task.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from 'src/services/tasks/tasks.service';
import { TaskModel } from '../../models/tasks/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.tasksService.createTask(createTaskDto);
  }
}
