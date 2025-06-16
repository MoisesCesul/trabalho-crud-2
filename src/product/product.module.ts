import { Module } from "@nestjs/common";
import { CreateProductController } from "./controller/create-product.controller";
import { DeleteProductController } from "./controller/delete-product.controller";
import { EditProductController } from "./controller/edit-product.controller";
import { FetchRecentProductsController } from "./controller/fetch-recent-products.controller";
import { GetProductByIdController } from "./controller/get-product-by-id.controller";
import { UpdateAvailableProductController } from "./controller/update-available-product.controller";
import { PrismaService } from "src/prisma.service";
import { CreateProductService } from "./service/create-product.service";
import { DeleteProductService } from "./service/delete-product.service";
import { EditProductService } from "./service/edit-product.service";
import { FetchRecentProductsService } from "./service/fetch-recent-products.service";
import { GetProductByIdService } from "./service/get-product-by-id.service";
import { UpdateAvailableProductService } from "./service/update-available-product.service";
import { ProductsRepository } from "./repository/products.repository";


@Module({
  imports: [],
  controllers: [CreateProductController, DeleteProductController, EditProductController, FetchRecentProductsController, GetProductByIdController, UpdateAvailableProductController],
  providers: [PrismaService, CreateProductService, DeleteProductService, EditProductService, FetchRecentProductsService, GetProductByIdService, UpdateAvailableProductService, ProductsRepository],
})
export class ProductModule {}
