import { HttpException, Injectable } from "@nestjs/common";
import { AuthPayloadDto, UserProfileResponse } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosRequestConfig } from "axios";
import { catchError, firstValueFrom } from "rxjs";

const fakeUsers = [
  {
    id: 1,
    username: "anson",
    password: "password",
  },
  {
    id: 2,
    username: "jack",
    password: "password123",
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}
  // validateUser({ username, password }: AuthPayloadDto) {
  //   const findUser = fakeUsers.find((user) => user.username === username);
  //   if (!findUser) return null;
  //   if (password === findUser.password) {
  //     const { password, ...user } = findUser;
  //     return this.jwtService.sign(user);
  //   }
  // }

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
    const user = data.kakao_account.profile;
    if (user.nickname != username) return null;
    else return this.jwtService.sign(user);
  }
}
