import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', length: 100 })
  public title: string

  @Column({ type: 'text' })
  public description: string

  @Column()
  public status: TaskStatus
}
