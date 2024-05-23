import { Friendship } from "src/friendship/friendship.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({ type: String, nullable: true })
  profile_image_url: string | null;

  @OneToMany((type) => Friendship, (friendship) => friendship.from)
  fromFriendships: Friendship[];

  @OneToMany((type) => Friendship, (friendship) => friendship.to)
  toFriendships: Friendship[];

  @OneToMany((type) => Friendship, (friendship) => friendship.from)
  blocking: Friendship[];
}
