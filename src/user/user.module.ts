import { Module } from "@nestjs/common";
import { ProfileModule } from "src/profile/profile.module";
import { CreateUserController } from "./controller/create-user.controller";
import { DeleteUserController } from "./controller/delete-user.controller";
import { EditUserController } from "./controller/edit-user.controller";
import { GetUsersByIdController } from "./controller/get-user-by-id.controller";
import { UpdateProfileUserController } from "./controller/update-profile-user.controller";
import { CreateUserService } from "./service/create-user.service";
import { DeleteUserService } from "./service/delete-user.service";
import { EditUsersService } from "./service/edit-user.service";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { UpdateProfileUserService } from "./service/update-profile-user.service";
import { PrismaService } from "src/prisma.service";
import { UserRepository } from "./repository/users.repository";
import { ProfileRepository } from "src/profile/repository/profile.repository";
import { GetOrdersByUserIdController } from "./controller/get-orders-by-user-id.controller";
import { GetOrderByUserIdService } from "./service/get-orders-by-id-user.service";

@Module({
  imports: [ProfileModule],
  controllers: [CreateUserController,DeleteUserController,EditUserController,GetUsersByIdController,UpdateProfileUserController,GetOrdersByUserIdController ],
  providers: [PrismaService,CreateUserService,DeleteUserService,EditUsersService,GetUserByIdService,UpdateProfileUserService,UserRepository,ProfileRepository,GetOrderByUserIdService],
})
export class UserModule {}