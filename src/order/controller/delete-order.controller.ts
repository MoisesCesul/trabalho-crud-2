import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteOrdersService } from "../service/delete-order.service";

@Controller('/orders/:id')
export class DeleteOrdersController {
  constructor(private deleteOrders: DeleteOrdersService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    await this.deleteOrders.execute({
      id,
    });
  }
}