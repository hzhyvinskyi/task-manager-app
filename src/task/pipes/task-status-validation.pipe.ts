import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "./../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses: Array<TaskStatus> = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  private isStatusValid(status: any): boolean {
    if (this.allowedStatuses.includes(status)) {
      return true;
    }

    throw new BadRequestException('Status is not allowed');
  }

  public transform(value: string) {
    this.isStatusValid(value);
    return value;
  }
}
