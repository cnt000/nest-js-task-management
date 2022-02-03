import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class updateTasksStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
