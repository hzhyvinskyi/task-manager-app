import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Array<Task>;

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

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): Array<Task> {
    return this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      return task;
    }
    return undefined;
  }
}
