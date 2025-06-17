import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "../repository/profile.repository";

interface DeleteUserServiceRequest {
  id: string;
}

@Injectable()
export class DeleteProfileService {
  constructor(private userRepository: ProfileRepository) {}

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