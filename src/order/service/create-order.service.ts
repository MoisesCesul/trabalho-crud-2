import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { OrdersRepository } from "../repository/order.repository";
import { ProductsRepository } from "src/product/repository/products.repository";
import { Prisma } from "generated/prisma";

interface CreateOrderServiceRequest {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

@Injectable()
export class CreateOrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productRepository: ProductsRepository
  ) {}

  async execute({ userId, items }: CreateOrderServiceRequest) {
    if (items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    let total = 0;

    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      total += product.price * item.quantity;
    }

    const ordem= await this.ordersRepository.createOrder({
      total,
      user: {
        connect: { id: userId },
      },
      orderItems: {
        create: items.map((item) => ({
          product: {
            connect: { id: item.productId },
          },
          quantity: item.quantity,
        })),
      },
    });
    return ordem;
  }
}