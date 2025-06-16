import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "../repository/models.repository";

interface DeleteModelServiceRequest {
  id: string;
}

@Injectable()
export class DeleteModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    id,
  }: DeleteModelServiceRequest): Promise<void> {
    const product = await this.modelsRepository.findById(id);

    if (!product) {
      throw new Error("Model not found");
    }

    await this.modelsRepository.delete(product);
  }
}