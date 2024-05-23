import { User } from "src/users/user.entity";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ViewEntity,
  ViewColumn,
} from "typeorm";

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne((type) => User, (user) => user.fromFriendships)
  from: User;

  @ManyToOne((type) => User, (user) => user.toFriendships)
  to: User;

  @Column({ type: "boolean", default: false })
  is_accepted: boolean;

  @Column({ type: "boolean", default: false })
  is_blocked: boolean;

  @ManyToOne((type) => User, (user) => user.blocking)
  blocked_by: User | null;
}
