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
}

interface GetProductByIdServiceRequest {
  id: string;
}

type GetProductByIdServiceResponse = {
  product: Product;
}

@Injectable()
export class GetProductByIdService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductByIdServiceRequest): Promise<GetProductByIdServiceResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const newProduct: Product = {
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
    };

    return {
      product: newProduct
    };
  }
}