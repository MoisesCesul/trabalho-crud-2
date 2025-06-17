import { Injectable } from "@nestjs/common";
import { Model, Prisma, Product } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) { }

  async findManyRecent(): Promise<(Product & { models: Model[] })[]> {
  return this.prisma.product.findMany({
    include: {
      models: true,
    },
  });
}

  async findById(id: string): Promise<Prisma.ProductUncheckedCreateInput | null> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      }
    });
  }

  async findByName(name: string): Promise<Prisma.ProductUncheckedCreateInput | null> {
    const product = this.prisma.product.findUnique({
      where: {
        name,
      }
    });

    return product;
  }

  async save(data: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.product.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(product: Prisma.ProductCreateInput): Promise<void> {
    await this.prisma.product.create({
      data: product,
    });
  }

  async delete(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id?.toString(),
      }
    });
  }
}