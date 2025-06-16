import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { EditModelService } from "../service/edit-model.service";

const editModelBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editModelBodySchema);

type EditModelBodySchema = z.infer<typeof editModelBodySchema>;

@Controller('/models/:id')
export class EditModelController {
  constructor(private editModel: EditModelService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditModelBodySchema,
    @Param("id") id: string,
  ) {
    const {
      name,
    } = body;

    await this.editModel.execute({
      name,
      id,
    });
  }
}