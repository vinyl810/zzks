import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { FriendshipDto, FriendshipRequestDto } from "./dto/friendship.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Request } from "express";
import { UserProfileDto } from "src/auth/dto/auth.dto";
import { UsersService } from "src/users/users.service";

@Controller("friendship")
export class FriendshipController {
  constructor(
    private friendshipService: FriendshipService,
    private usersService: UsersService
  ) {}

  @Post("add")
  @UseGuards(JwtAuthGuard)
  async add(@Body() body: FriendshipRequestDto, @Req() req: Request) {
    const user = req.user as UserProfileDto;
    const fromUser = await this.usersService.findOne(user.id);
    const toUser = await this.usersService.findOne(body.to_id);
    if (!fromUser || !toUser)
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

    const exists = await this.friendshipService.findOneByFromTo(
      fromUser,
      toUser
    );
    console.log("body: ", body);
    console.log("exists: ", exists);
    if (!exists)
      return this.friendshipService.create({
        fromId: user.id,
        toId: body.to_id,
      });
    else
      throw new HttpException(
        "Friendship already exists",
        HttpStatus.BAD_REQUEST
      );
  }

  @Get("userfriends")
  @UseGuards(JwtAuthGuard)
  async userFriends(@Req() req: Request) {
    const user = req.user as UserProfileDto;
    const fromUser = await this.usersService.findOne(user.id);
    if (!fromUser)
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    return this.friendshipService.findFriends(fromUser);
  }
}
