import { Injectable } from "@nestjs/common";

import { OrdersRepository } from "../repository/order.repository";
import { Prisma } from "@prisma/client";

export interface Order {
    id: string;
    total: number;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutOrderInput;
}

type FetchRecentOrdersServiceResponse = {
  order: Order[];
}

@Injectable()
export class FetchRecentOrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

async execute(): Promise<FetchRecentOrdersServiceResponse> {

  const findOrders = await this.ordersRepository.findManyRecent();

  if (!findOrders || findOrders.length === 0) {
    throw new Error("No recent orders found");
  }

  const order: Order[] = [];

  for (const ordem of findOrders) {
      order.push({
        id: ordem.id?.toString() || "",
        total: ordem.total,
        userId: ordem.userId,
        createdAt: ordem.createdAt,
        updatedAt: ordem.updatedAt,
        orderItems: ordem.orderItems,
      });
    
  }

  return {
    order,
  };
}
}