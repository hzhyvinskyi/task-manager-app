import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public getTasks(@Param() filterDto: GetTasksFilterDTO): Array<Task> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getFilteredTasks(filterDto);
    }
    return this.taskService.getTasks;
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task | undefined {
    return this.taskService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  public updateTaskStatus(@Param() id: string, @Body() status: TaskStatus): Task | undefined {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): Object {
    return this.taskService.deleteTask(id);
  }
}
