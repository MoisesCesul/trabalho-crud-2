import { Injectable } from "@nestjs/common";
import { Prisma, Profile } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";
import { ProfileRepository } from "src/profile/repository/profile.repository";

export interface UserProfile {
  id: string;
  avatarUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile | null;
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
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository
  ) {}

  async execute({
    id,
  }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new Error("User not found");
    }

    const profile = await this.profileRepository.findByUserId(id);

    const newUser: User = {
        id: userFound.id?.toString() || "",
        email: userFound.email,
        order: userFound.order as Prisma.OrderUncheckedCreateNestedManyWithoutUserInput | null,
        createdAt: userFound.createdAt as Date,
        updatedAt: userFound.updatedAt as Date | null,
        profile: profile ? {
          id: profile.id?.toString() || "",
          avatarUrl: profile.avatarUrl || "",
          userId: profile.userId,
          createdAt: profile.createdAt as Date,
          updatedAt: profile.updatedAt as Date | null,
        } : null
    };

    return {
      user: newUser
    };
  }
}