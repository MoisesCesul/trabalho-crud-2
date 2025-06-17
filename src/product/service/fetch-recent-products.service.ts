import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { ProductsRepository } from "../repository/products.repository";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: Boolean;
  category: Category;
  tags: string[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
  model: {}[];
}

type FetchRecentProductsServiceResponse = {
  products: Product[];
}

@Injectable()
export class FetchRecentProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchRecentProductsServiceResponse> {
    const products = await this.productsRepository.findManyRecent();

    const newProducts: Product[] = [];

    if (!products) {
      throw new Error("Products not found");
    }

    for (const product of products) {
      newProducts.push({
        id: product.id?.toString() || "",
        name: product.name,
        description: product.description as string,
        price: product.price,
        inStock: product.inStock,
        isAvailable: !!product.isAvailable,
        category: product.category,
        tags: product.tags as string[],
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        model: product.models
      });
    }

    return {
      products: newProducts
    };
  }
}