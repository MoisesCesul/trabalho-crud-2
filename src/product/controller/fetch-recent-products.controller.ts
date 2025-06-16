import { Controller, Get } from "@nestjs/common";
import { FetchRecentProductsService } from "../service/fetch-recent-products.service";

@Controller('/products')
export class FetchRecentProductsController {
  constructor(private fetchRecentProducts: FetchRecentProductsService) {}

  @Get()
  async handle() {
    const products = await this.fetchRecentProducts.execute();

    return {
      products
    };
  }
}