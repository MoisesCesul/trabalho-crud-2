import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.ProfileUncheckedCreateInput[] | null> {
    return await this.prisma.profile.findMany();
  }

  async findById(id: string): Promise<Prisma.ProfileUncheckedCreateInput | null> {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      }
    });
  }

  async findByUserId(userId: string): Promise<Prisma.ProfileUncheckedCreateInput | null> {
    const profile = this.prisma.profile.findUnique({
      where: {
        userId,
      }
    });

    return profile;
  }

  async save(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.profile.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(profile: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data: profile,
    });
  }

  async delete(profile: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        id: profile.id?.toString(),
      }
    });
  }
}