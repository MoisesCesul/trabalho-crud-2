import { Body, Controller, HttpCode, Put } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { UpdateProfileUserService } from "../service/create-profile.service";
import { AlreadyExistException } from "src/exception/AlreadyExistException";

const updateProfileUserBodySchema = z.object({
  userId :z.string(),
  avatarUrl: z.string().url(),
});

const bodyValidationPipe = new ZodValidationPipe(updateProfileUserBodySchema);

type UpdateProfileUserBodySchema = z.infer<typeof updateProfileUserBodySchema>;

@Controller('/profile')
export class CreateProfileUserController {
  constructor(private  updateProfileUser: UpdateProfileUserService
    
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateProfileUserBodySchema,
  ) {
    const {
      userId,
      avatarUrl
    } = body;

    try {
      await this.updateProfileUser.execute({
        userId,
        avatarUrl,
      });
    } catch (error) {
      if (error instanceof AlreadyExistException) {
        return error.retornoJson;
      }
      if (error instanceof Error) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
    }
   
  }
}