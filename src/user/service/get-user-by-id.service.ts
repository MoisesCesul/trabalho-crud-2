import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";

export interface User {
  id: string;
  email: string;
  profile: Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput | null;
  order: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput | null;
  createdAt: Date;
  updatedAt: Date | null;  
}

interface GetUserByIdServiceRequest {
  id: string;
}

type GetUserByIdServiceResponse = {
  user: User;
}

@Injectable()
export class GetUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new Error("User not found");
    }

    const newUser: User = {
        id: userFound.id?.toString() || "",
        email: userFound.email,
        profile: userFound.profile as Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput | null,
        order: userFound.order as Prisma.OrderUncheckedCreateNestedManyWithoutUserInput | null,
        createdAt: userFound.createdAt as Date,
        updatedAt: userFound.updatedAt as Date | null,
    };

    return {
      user: newUser
    };
  }
}