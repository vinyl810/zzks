import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /*
   * normally, local strategy uses {username: string, password: string} as normal template for validation.(validate() method)
   * instead, we can use contructor of the super class to modify the template for validation.
   * e.g. super({usernameField: 'username-insteadof', passwordField: 'password-insteadof'})
   * I used ktoken(kakao token) instead of password.
   */
  constructor(private authService: AuthService) {
    super({
      passwordField: "ktoken",
    });
  }

  async validate(username: string, ktoken: string) {
    console.log("Inside LocalStrategy");
    return await this.authService.validate({
      username,
      ktoken,
    });
  }
}
