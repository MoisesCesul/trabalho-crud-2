import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { Category } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUserService } from "../service/create-user.service";

const createUsersBodySchema = z.object({
  email: z.string().email(),
});

const bodyValidationPipe = new ZodValidationPipe(createUsersBodySchema);

type CreateUsersBodySchema = z.infer<typeof createUsersBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateUsersBodySchema) {
    const {
      email,
    } = body;

    await this.createUser.execute({
      email,
     
    });
  }
}