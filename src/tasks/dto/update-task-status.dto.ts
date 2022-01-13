import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class updateTasksStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
