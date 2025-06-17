import { Injectable } from "@nestjs/common";
import { Prisma,Profile } from "@prisma/client";
import { ProfileRepository } from "src/profile/repository/profile.repository";

export interface ProfileProfile {
  avatarUrl: string;
  userId: string;
}


interface GetProfileByIdServiceRequest {
  id: string;
}

type GetProfileByIdServiceResponse = {
  profile: Profile;
}

@Injectable()
export class GetProfileByIdService {
  constructor(
    private profileRepository: ProfileRepository
  ) {}

  async execute({
    id,
  }: GetProfileByIdServiceRequest): Promise<GetProfileByIdServiceResponse> {

    const profile = await this.profileRepository.findByUserId(id);
    if(!profile) {
      throw new Error("Profile not found");
    }

    return {
      profile: profile as Profile,
    };
  }
}