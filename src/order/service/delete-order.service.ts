import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "../repository/order.repository";

interface DeleteOrderServiceRequest {
  id: string;
}

@Injectable()
export class DeleteOrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: DeleteOrderServiceRequest): Promise<void> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await this.ordersRepository.delete(order);
  }
}