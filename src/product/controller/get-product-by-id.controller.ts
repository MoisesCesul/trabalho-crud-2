import { Controller, Get, Param } from "@nestjs/common";
import { GetProductByIdService } from "../service/get-product-by-id.service";

@Controller('/products/:id')
export class GetProductByIdController {
  constructor(private getProductById: GetProductByIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    const product = await this.getProductById.execute({
      id,
    });

    return {
      product
    };
  }
}