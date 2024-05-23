import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
export declare class AuthService {
    private jwtService;
    private readonly httpService;
    constructor(jwtService: JwtService, httpService: HttpService);
    validate({ username, ktoken }: AuthPayloadDto): Promise<string>;
}
