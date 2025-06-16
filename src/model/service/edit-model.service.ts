import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "../repository/models.repository";

interface EditModelServiceRequest {
  name: string;
  id: string;
}

@Injectable()
export class EditModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    name,
    id,
  }: EditModelServiceRequest): Promise<void> {
    const model = await this.modelsRepository.findById(id);

    if (!model) {
      throw new Error("Model not found");
    }

    model.name = name;

    await this.modelsRepository.save(model);
  }
}