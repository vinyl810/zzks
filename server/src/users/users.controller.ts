import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { AuthPayloadDto, UserProfileDto } from "src/auth/dto/auth.dto";
import { UsersService } from "./users.service";
import { Request } from "express";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post("signup")
  @UseGuards(JwtAuthGuard)
  async signup(@Req() req: Request) {
    const user = req.user as UserProfileDto;
    const exists = await this.usersService.findOne(user.id);
    console.log(exists);
    if (!exists) return this.usersService.create(user);
    else throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
  }

  @Post("signout")
  @UseGuards(JwtAuthGuard)
  async signout(@Req() req: Request) {
    console.log("signout");
    const user = req.user as UserProfileDto;
    const exists = await this.usersService.findOne(user.id);
    if (!exists)
      throw new HttpException("User not exists", HttpStatus.BAD_REQUEST);
    else await this.usersService.remove(user.id);
    return "signout success: " + user.nickname;
  }
}
