import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Array<Task> = [];

  get getTasks(): Array<Task> {
    return this.tasks;
  }

  public getFilteredTasks(filterDto: GetTasksFilterDTO): Array<Task> {
    const { status, search } = filterDto;
    let tasks: Array<Task> = this.getTasks;

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) ||
      task.description.includes(search));
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  public createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): Array<Task> {
    const foundTask = this.getTaskById(id);
    return this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
