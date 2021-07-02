import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from '../../controllers/tasks/tasks.controller';
import { TasksService } from '../../services/tasks/tasks.service';
import { TaskRepository } from 'src/utilities/repositories/task/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
