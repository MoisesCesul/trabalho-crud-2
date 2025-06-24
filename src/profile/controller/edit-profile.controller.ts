import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { Category } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { EditProfilesService } from "../service/edit-profile.service";
const editProfileBodySchema = z.object({
  id: z.string().uuid(),
  avatarUrl: z.string().url()

});

const bodyValidationPipe = new ZodValidationPipe(editProfileBodySchema);

type EditProfileBodySchema = z.infer<typeof editProfileBodySchema>;

@Controller('/profile/:id')
export class EditProfileController {
  constructor(private editUser: EditProfilesService) { }

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProfileBodySchema,
    @Param("id") id: string,
  ) {
    const {
      avatarUrl,
    } = body;
    try {
      await this.editUser.execute({
        avatarUrl,
        id
      });
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }

    }

  }
}