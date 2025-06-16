import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { Category } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateOrdersService } from "../service/create-order.service";

const createOrderBodySchema = z.object({
  userId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().positive(),
    })
  ).min(1, "Order must contain at least one item"),
});

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema);

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

@Controller('/orders')
export class CreateOrderController {
  constructor(private createOrder: CreateOrdersService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateOrderBodySchema) {
    const { userId, items } = body;

    const order = await this.createOrder.execute({
      userId,
      items,
    });

    return { order };
  }
}