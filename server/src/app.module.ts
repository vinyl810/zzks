import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "zzks",
      entities: [User],
      synchronize: true, // to be removed in production becuase of the possibility of data loss
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
