import { Module } from "@nestjs/common";
import { OrdersRepository } from "./repository/order.repository";
import { CreateOrdersService } from "./service/create-order.service";
import { CreateOrderController } from "./controller/create-order.controller";
import { PrismaService } from "src/prisma.service";
import { ProductsRepository } from "src/product/repository/products.repository";
import { DeleteOrdersController } from "./controller/delete-order.controller";
import { DeleteOrdersService } from "./service/delete-order.service";
import { EditOrderController } from "./controller/edit-order.controller";
import { EditOrdersService } from "./service/edit-order.service";
import { FetchRecentOrdersService } from "./service/fetch-recent-order.service";
import { FetchRecentOrdersController } from "./controller/fetch-recent-orders.controller";
import { GetOrderByIdController } from "./controller/get-order-by-id.controller";
import { GetOrderByIdService } from "./service/get-order-by-id.service";

@Module({
  imports: [],
  controllers: [CreateOrderController,DeleteOrdersController,EditOrderController,FetchRecentOrdersController,GetOrderByIdController],
  providers: [OrdersRepository,CreateOrdersService,PrismaService,ProductsRepository,DeleteOrdersService,EditOrdersService,FetchRecentOrdersService,GetOrderByIdService],
})
export class OrderModule {}