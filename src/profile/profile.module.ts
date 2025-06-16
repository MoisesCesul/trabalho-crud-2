import { Module } from "@nestjs/common";
import { ProfileRepository } from "./repository/profile.repository";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, ProfileRepository],
})
export class ProfileModule {}
