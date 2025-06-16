import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";

interface CreateProductServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: CreateProductServiceRequest): Promise<void> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("User already exists");
    }

    const user = {
      email,
       profile: {
        create: {}
      },
    };

    await this.userRepository.create(user);
  }
}