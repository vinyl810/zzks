import { HttpException, Injectable } from "@nestjs/common";
import {
  AuthPayloadDto,
  UserProfileResponse,
  UserProfileDto,
} from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosRequestConfig } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async validate({ username, ktoken }: AuthPayloadDto) {
    console.log("validating... ktoken: ", ktoken);
    const url = "https://kapi.kakao.com/v2/user/me";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ktoken}`,
      },
      params: {
        secure_resource: true,
        property_keys: ["kakao_account.profile"],
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.get<UserProfileResponse>(url, config).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw "An error happened!";
        })
      )
    );

    const id = data.id;
    const userprofile = data.kakao_account.profile;
    const user: UserProfileDto = {
      id,
      nickname: userprofile.nickname,
      profile_image_url: userprofile.profile_image_url,
      is_default_image: userprofile.is_default_image,
    };
    if (user.nickname != username) return null;
    else return this.jwtService.sign(user);
  }
}
