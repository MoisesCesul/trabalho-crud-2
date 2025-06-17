import { Injectable } from "@nestjs/common";
import { Category, Prisma } from "@prisma/client";
import { ProductsRepository } from "../repository/products.repository";
import { ModelsRepository } from "src/model/repository/models.repository";

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelId?: string;
}

@Injectable()
export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private modelsRepository: ModelsRepository,
  ) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    modelId,
  }: CreateProductServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new Error("Product already exists");
    }
    let model: Prisma.ModelUncheckedCreateInput | null = null;
    if (modelId) {
      model = await this.modelsRepository.findById(modelId);
    }
    const product = {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      models: model ? { connect: [{ id: model.id }] } : undefined,
    };

    await this.productsRepository.create(product);
  }
}