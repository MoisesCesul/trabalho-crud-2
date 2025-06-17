import { Injectable } from "@nestjs/common";
import { Order, Prisma, OrderItem,Product } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

interface OrderWithItems {
  id: string;
  total: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  orderItems: {
    createdAt: Date;
    updatedAt: Date | null;
    orderId: string;
    productId: string;
    quantity: number;  

  }[];
}

@Injectable()
export class OrdersRepository {
    constructor(private prisma: PrismaService) { }

    async findManyRecent(): Promise<Prisma.OrderUncheckedCreateInput[] | null> {
        return await this.prisma.order.findMany();
    }

  async findById(id: string) {
  const order = await this.prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        select: {
          productId: true,
          quantity: true,
          createdAt:true,
          updatedAt:true,
          product:true,
        },
      },
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    total: order.total,
    userId: order.userId,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    orderItems: order.orderItems.map(item => ({
      item
    })),
  };
}

    async save(data: Prisma.OrderUncheckedCreateInput): Promise<void> {
        await Promise.all([
            this.prisma.order.update({
                where: {
                    id: data.id?.toString(),
                },
                data,
            }),
        ]);
    }

    async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
        return this.prisma.order.create({
            data,
            include: {
                orderItems: true,
            },
        });
    }

    async delete(order): Promise<void> {
        const orderId = order.id?.toString();


        await this.prisma.orderItem.deleteMany({
            where: { orderId },
        });
        await this.prisma.order.delete({
            where: { id: orderId },
        });
    }
    async updateOrderWithItems(
        id: string,
        items?: { productId: string; quantity: number }[],
    ) {
        if (!items) {
            throw new Error("Items must be provided");
        }

        const products = await this.prisma.product.findMany({
            where: {
                id: { in: items.map(item => item.productId) }
            },
            select: {
                id: true,
                price: true,
            }
        });

        const total = items.reduce((acc, item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);
            return acc + product.price * item.quantity;
        }, 0);


        return this.prisma.order.update({
            where: { id },
            data: {
                total,
                orderItems: {
                    deleteMany: {},
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });
    }
}