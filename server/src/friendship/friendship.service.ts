import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Friendship } from "./friendship.entity";
import { FriendshipDto } from "./dto/friendship.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private usersService: UsersService
  ) {}

  findAllRelated(user: User): Promise<Friendship[]> {
    return this.friendshipRepository.find({
      where: [{ from: user }, { to: user }],
      relations: ["from", "to"],
    });
  }

  findOneByFromTo(from: User, to: User): Promise<Friendship | null> {
    return this.friendshipRepository.findOneBy({ from: from, to: to });
  }

  async findFriends(user: User): Promise<User[]> {
    const friendships = await this.findAllRelated(user);

    const friends = friendships.map((friendship) => {
      console.log(friendship.from);
      if (friendship.from.id === user.id) return friendship.to;
      else return friendship.from;
    });
    return friends;
  }

  async findAllByTo(to: User): Promise<Friendship[]> {
    return this.friendshipRepository.find({
      where: { to },
    });
  }

  async create(friendshipDto: FriendshipDto): Promise<Friendship> {
    const friendship = new Friendship();
    friendship.from = await this.usersService.findOne(friendshipDto.fromId);
    friendship.to = await this.usersService.findOne(friendshipDto.toId);
    console.log("friendship create: ", friendship);
    return this.friendshipRepository.save(friendship);
  }

  async remove(id: string): Promise<void> {
    await this.friendshipRepository.delete(id);
  }

  async removeByFrom(from: User): Promise<void> {
    await this.friendshipRepository.delete({ from });
  }
}
