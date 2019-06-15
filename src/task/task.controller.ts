import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public getAllTasks(): Array<Task> {
    return this.taskService.getAllTasks;
  }

  @Post()
  public createTask(@Body('title') title: string, @Body('description') description: string): Task {
    return this.taskService.createTask(title, description);
  }
}
