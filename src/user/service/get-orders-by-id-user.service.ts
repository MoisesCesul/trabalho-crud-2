import { Injectable } from "@nestjs/common";
import { Prisma, Order } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";


interface GetUserOrdersByIdServiceRequest {
  id: string;
}


@Injectable()
export class GetOrderByUserIdService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute({
    id,
  }: GetUserOrdersByIdServiceRequest) {
    const orders = await this.userRepository.findOrdersByUserId(id);

    if (!orders) {
      throw new Error("User not found");
    }


    return {
      orders: orders
    };
  }
}