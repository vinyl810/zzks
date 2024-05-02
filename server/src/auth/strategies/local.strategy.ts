import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // validate(username: string, password: string) {
  //   console.log('Inside LocalStrategy');
  //   const token = this.authService.validateUser({ username, password });
  //   if (!token) throw new UnauthorizedException();
  //   return token;
  // }
  async validate(username: string, token: string) {
    console.log('Inside LocalStrategy');
    return await this.authService.validateUserKakao({ username, token });
  }
}
