import { Controller, Delete, Get, HttpCode, Param } from "@nestjs/common";
import { DeleteModelService } from "../service/delete-model.service";
@Controller('/models/:id')
export class DeleteModelController {
  constructor(private deleteModel: DeleteModelService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    await this.deleteModel.execute({
      id,
    });
  }
}