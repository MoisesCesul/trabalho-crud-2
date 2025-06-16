import { Module } from "@nestjs/common";
import { ProfileModule } from "src/profile/profile.module";
import { CreateUserController } from "./controller/create-user.controller";
import { DeleteUserController } from "./controller/delete-user.controller";
import { EditUserController } from "./controller/edit-user.controller";
import { FetchRecentUsersController } from "./controller/fetch-recent-users.controller";
import { GetUsersByIdController } from "./controller/get-user-by-id.controller";
import { UpdateProfileUserController } from "./controller/update-profile-user.controller";
import { CreateUserService } from "./service/create-user.service";
import { DeleteUserService } from "./service/delete-user.service";
import { EditUsersService } from "./service/edit-user.service";
import { FetchRecentUsersService } from "./service/fetch-recent-users.service";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { UpdateProfileUserService } from "./service/update-profile-user.service";
import { PrismaService } from "src/prisma.service";
import { UserRepository } from "./repository/users.repository";
import { ProfileRepository } from "src/profile/repository/profile.repository";

@Module({
  imports: [ProfileModule],
  controllers: [CreateUserController,DeleteUserController,EditUserController,FetchRecentUsersController,GetUsersByIdController,UpdateProfileUserController, ],
  providers: [PrismaService,CreateUserService,DeleteUserService,EditUsersService,FetchRecentUsersService,GetUserByIdService,UpdateProfileUserService,UserRepository,ProfileRepository],
})
export class UserModule {}