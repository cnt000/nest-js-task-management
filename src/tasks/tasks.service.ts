import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.GetTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const { affected } = await this.tasksRepository.delete({ id, user });

    if (affected === 0) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
}
