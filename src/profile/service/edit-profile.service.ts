import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "../repository/profile.repository";


interface EditUserServiceRequest {
  avatarUrl: string;
  id: string;
}

@Injectable()
export class EditProfilesService {
  constructor(private profileRepository: ProfileRepository) {}

  async execute({
    avatarUrl,
    id
  }: EditUserServiceRequest): Promise<void> {
    const user = await this.profileRepository.findById(id);

    if (!user) {
      throw new Error("Product not found");
    }

    user.avatarUrl = avatarUrl;
 

    await this.profileRepository.save(user);
  }
}