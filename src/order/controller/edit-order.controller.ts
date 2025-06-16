import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { EditOrdersService } from "../service/edit-order.service";

const editOrderBodySchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().positive(),
    })
  ).optional(),
});

const bodyValidationPipe = new ZodValidationPipe(editOrderBodySchema);

type EditOrderBodySchema = z.infer<typeof editOrderBodySchema>;

@Controller('/orders/:id')
export class EditOrderController {
  constructor(private editOrder: EditOrdersService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditOrderBodySchema,
    @Param("id") id: string,
  ) {
    await this.editOrder.execute({
      id,
      ...body,
    });
  }
}