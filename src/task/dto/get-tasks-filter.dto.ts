import { TaskStatus } from "./../task-status.enum";
import { IsOptional, IsNotEmpty, IsIn } from "class-validator";

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  public status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  public search: string;
}
