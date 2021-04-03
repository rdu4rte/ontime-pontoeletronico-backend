import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity({ name: "clock" })
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entry: string;

  @Column()
  day: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user._clock)
  _user: User;
}
