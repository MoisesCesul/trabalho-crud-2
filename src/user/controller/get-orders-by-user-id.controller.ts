import { Controller, Get, Param } from "@nestjs/common";
import { GetOrderByUserIdService } from "../service/get-orders-by-id-user.service";

@Controller('/users/:id/orders')
export class GetOrdersByUserIdController {
  constructor(private getUserById: GetOrderByUserIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    try {
      
    } catch (error) { {
      if (error instanceof Error) {
        return {
          statusCode: 404,
          error: error.message,
        };
      }
      
      
    }
    const users = await this.getUserById.execute({
      id,
    });
  
    return {
      users
    };
  }
}
}