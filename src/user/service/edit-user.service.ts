import { Injectable } from "@nestjs/common";

import { UserRepository } from "../repository/users.repository";

interface EditUserServiceRequest {
  email: string;
  id: string;
}

@Injectable()
export class EditUsersService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    id,
  }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("Product not found");
    }

    user.email = email;
 

    await this.usersRepository.save(user);
  }
}