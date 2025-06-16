import { Module } from "@nestjs/common";
import { CreateModelController } from "./service/create-model.controller";
import { DeleteModelController } from "./controller/delete-model.controller";
import { EditModelController } from "./controller/edit-model.controller";
import { FetchRecentModelsController } from "./controller/fetch-recent-models.controller";
import { GetModelByIdController } from "./controller/get-model-by-id.controller";
import { PrismaService } from "src/prisma.service";
import { CreateModelService } from "./service/create-model.service";
import { DeleteModelService } from "./service/delete-model.service";
import { EditModelService } from "./service/edit-model.service";
import { FetchRecentModelsService } from "./service/fetch-recent-models.service";
import { GetModelByIdService } from "./service/get-model-by-id.service";
import { ModelsRepository } from "./repository/models.repository";


@Module({
  imports: [],
  controllers: [CreateModelController, DeleteModelController, EditModelController, FetchRecentModelsController, GetModelByIdController],
  providers: [PrismaService, CreateModelService, DeleteModelService, EditModelService, FetchRecentModelsService, GetModelByIdService, ModelsRepository],
})
export class ModelModule {}
