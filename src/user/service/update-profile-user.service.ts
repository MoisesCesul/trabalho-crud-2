import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/users.repository";
import { ProfileRepository } from "src/profile/repository/profile.repository";

interface UpdateAvailableProductServiceRequest {
  userId : string,
  avatarUrl: string,
}

@Injectable()
export class UpdateProfileUserService {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository 
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: UpdateAvailableProductServiceRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    profile.avatarUrl = avatarUrl;
    await this.profileRepository.save(profile);
  }
}
