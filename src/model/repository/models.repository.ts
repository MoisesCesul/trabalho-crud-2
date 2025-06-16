import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ModelsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.ModelUncheckedCreateInput[] | null> {
    return await this.prisma.model.findMany();
  }

  async findById(id: string): Promise<Prisma.ModelUncheckedCreateInput | null> {
    return await this.prisma.model.findUnique({
      where: {
        id,
      }
    });
  }

  async save(data: Prisma.ModelUncheckedUpdateInput): Promise<void> {
    await Promise.all([
      this.prisma.model.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(data: Prisma.ModelUncheckedCreateInput): Promise<void> {
    await this.prisma.model.create({
      data,
    });
  }

  async delete(model: Prisma.ModelUncheckedCreateInput): Promise<void> {
    await this.prisma.model.delete({
      where: {
        id: model.id?.toString(),
      }
    });
  }
}