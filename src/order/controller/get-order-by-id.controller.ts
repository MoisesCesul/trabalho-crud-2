import { Controller, Get, Param } from "@nestjs/common";
import { GetOrderByIdService } from "../service/get-order-by-id.service";

@Controller('/orders/:id')
export class GetOrderByIdController {
  constructor(private getOrderByIdService: GetOrderByIdService) { }

  @Get()
  async handle(@Param("id") id: string) {
    try {
      const order = await this.getOrderByIdService.execute({ id });

      return { order };
    } catch (error) {
      return {
        error: error.message || "An unexpected error occurred",
        status: 404
      };
    }

  }
}