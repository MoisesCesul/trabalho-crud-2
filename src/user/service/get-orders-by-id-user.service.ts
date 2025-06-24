import { Injectable } from "@nestjs/common";
import { Prisma, Order } from "@prisma/client";
import { UserRepository } from "../repository/users.repository";
import { AlreadyExistException } from "src/exception/AlreadyExistException";


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
      throw new AlreadyExistException("User not found");
    }


    return {
      orders: orders
    };
  }
}