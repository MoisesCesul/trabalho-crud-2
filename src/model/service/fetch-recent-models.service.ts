import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "../repository/models.repository";

export interface Model {
  id: string;
  name: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

type FetchRecentModelsServiceResponse = {
  models: Model[];
}

@Injectable()
export class FetchRecentModelsService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute(): Promise<FetchRecentModelsServiceResponse> {
    const models = await this.modelsRepository.findManyRecent();

    const newModels: Model[] = [];

    if (!models) {
      throw new Error("Models not found");
    }

    for (const model of models) {
      newModels.push({
        id: model.id?.toString() || "",
        name: model.name,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      });
    }

    return {
      models: newModels
    };
  }
}