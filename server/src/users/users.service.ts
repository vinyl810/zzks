import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserProfileDto } from "src/auth/dto/auth.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
    // private dataSource: DataSource
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userProfileDto: UserProfileDto): Promise<User> {
    const user = new User();
    user.id = userProfileDto.id;
    user.username = userProfileDto.nickname;
    if (userProfileDto.is_default_image) user.profile_image_url = null;
    else user.profile_image_url = userProfileDto.profile_image_url;
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
