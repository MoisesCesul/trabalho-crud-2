import { Controller, Get, Param } from "@nestjs/common";
import { GetOrderByIdService } from "../service/get-order-by-id.service";

@Controller('/orders/:id')
export class GetOrderByIdController {
  constructor(private getOrderByIdService: GetOrderByIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    const order = await this.getOrderByIdService.execute({ id });

    return { order };
  }
}