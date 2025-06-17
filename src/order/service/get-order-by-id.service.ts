import { Injectable } from "@nestjs/common";

import { OrdersRepository } from "../repository/order.repository";



interface GetOrdersByIdServiceRequest {
  id: string;
}



@Injectable()
export class GetOrderByIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ id }: GetOrdersByIdServiceRequest){
    const orderFind = await this.ordersRepository.findById(id);

    if (!orderFind) {
      throw new Error("Order not found");
    }

    return {
      order:orderFind,
    };
  }
}