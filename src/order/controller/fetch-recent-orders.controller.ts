import { Controller, Get } from "@nestjs/common";
import { FetchRecentOrdersService } from "../service/fetch-recent-order.service";


@Controller('/orders')
export class FetchRecentOrdersController {
  constructor(private fetchRecentOders: FetchRecentOrdersService) {}

  @Get()
  async handle() {
    const orders = await this.fetchRecentOders.execute();

    return {
      orders
    };
  }
}