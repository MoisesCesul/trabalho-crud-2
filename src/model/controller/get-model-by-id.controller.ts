import { Controller, Get, Param } from "@nestjs/common";
import { GetModelByIdService } from "../service/get-model-by-id.service";

@Controller('/models/:id')
export class GetModelByIdController {
  constructor(private getModelById: GetModelByIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    const model = await this.getModelById.execute({
      id,
    });

    return {
      model
    };
  }
}