import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/users.repository";

interface DeleteUserServiceRequest {
  id: string;
}

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(user);
  }
}