import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendshipService } from "./friendship.service";
import { Friendship } from "./friendship.entity";
import { FriendshipController } from "./friendship.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Friendship]), UsersModule],
  providers: [FriendshipService],
  controllers: [FriendshipController],
  exports: [TypeOrmModule],
})
export class FriendshipModule {}
