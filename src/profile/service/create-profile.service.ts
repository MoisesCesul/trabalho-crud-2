import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "src/profile/repository/profile.repository";
import { UserRepository } from "src/user/repository/users.repository";

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
    if (profile) {
      throw new Error("User already has a profile");
    }

    const newProfile = {
      userId: user.id as string,
      avatarUrl: avatarUrl,
    };
    await this.profileRepository.create(newProfile);
  }
}
