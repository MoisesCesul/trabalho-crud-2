import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { Category } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { EditUsersService } from "../service/edit-user.service";
const editUserBodySchema = z.object({
  email: z.string().email()
});

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema);

type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller('/users/:id')
export class EditUserController {
  constructor(private editUser: EditUsersService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUserBodySchema,
    @Param("id") id: string,
  ) {
    const {
      email,
    } = body;

    await this.editUser.execute({
     email,
     id
    });
  }
}