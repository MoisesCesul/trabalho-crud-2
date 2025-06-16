import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.UserUncheckedCreateInput[] | null> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<Prisma.UserUncheckedCreateInput | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      }
    });
  }


  async save(data: Prisma.UserUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.user.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(user: Prisma.UserUncheckedCreateInput): Promise<void> {
    await this.prisma.user.create({
      data: user,
    });
  }

 async delete(user: Prisma.UserUncheckedCreateInput): Promise<void> {
  await this.prisma.profile.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await this.prisma.user.delete({
    where: {
      id: user.id,
    },
  });
}

   async findByEmail(email: string): Promise<Prisma.UserUncheckedCreateInput | null> {
    const product = this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    return product;
  }

}