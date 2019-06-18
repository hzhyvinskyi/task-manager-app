import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private readonly taskRepository: TaskRepository;

  constructor(
    @InjectRepository(TaskRepository)
    taskRepository: TaskRepository
  ) {
    this.taskRepository = taskRepository;
  }

  public getTasks(filterDto: GetTasksFilterDTO) {
    // TODO
  }

  public async getTaskById(id: number): Promise<Task> {
    const task: Task | undefined = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  public async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = await this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    return task;
  }

  public async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  public updateTaskStatus(id: number, status: TaskStatus): Promise<UpdateResult> {
    return this.taskRepository.update({ id }, { status });
  }
}
