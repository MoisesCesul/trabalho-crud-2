import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "../repository/models.repository";

export interface Model {
  id: string;
  name: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetModelByIdServiceRequest {
  id: string;
}

type GetModelByIdServiceResponse = {
  model: Model;
}

@Injectable()
export class GetModelByIdService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    id,
  }: GetModelByIdServiceRequest): Promise<GetModelByIdServiceResponse> {
    const model = await this.modelsRepository.findById(id);

    if (!model) {
      throw new Error("Model not found");
    }

    const newModel: Model = {
      id: model.id?.toString() || "",
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return {
      model: newModel
    };
  }
}