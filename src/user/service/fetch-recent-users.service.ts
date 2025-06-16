import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/users.repository";
import { Prisma } from "@prisma/client";
export interface User {
  id: string;
  email: string;
  profile: Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput | null;
  order: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput | null;
  createdAt: Date;
  updatedAt: Date | null;  
}

type FetchRecentUsersServiceResponse = {
  user: User[];
}

@Injectable()
export class FetchRecentUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FetchRecentUsersServiceResponse> {
    const users = await this.userRepository.findManyRecent();

    const newUsers: User[] = [];

    if (!users) {
      throw new Error("Users not found");
    }

    for (const user of users) {
      newUsers.push({
        id: user.id?.toString() || "",
        email: user.email,
        profile : user.profile as Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput | null,
        order: user.order as Prisma.OrderUncheckedCreateNestedManyWithoutUserInput | null,
        createdAt: user.createdAt as Date,
        updatedAt: user.updatedAt as Date | null,
      });
    }

    return {
      user : newUsers
    };
  }
}