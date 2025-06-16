import { Body, Controller, HttpCode, Patch, Put } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { UpdateProfileUserService } from "../service/update-profile-user.service";


const updateProfileUserBodySchema = z.object({
  userId :z.string(),
  avatarUrl: z.string().url(),
});

const bodyValidationPipe = new ZodValidationPipe(updateProfileUserBodySchema);

type UpdateProfileUserBodySchema = z.infer<typeof updateProfileUserBodySchema>;

@Controller('/users/profile/update')
export class UpdateProfileUserController {
  constructor(private  updateProfileUser: UpdateProfileUserService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateProfileUserBodySchema,
  ) {
    const {
      userId,
      avatarUrl
    } = body;

  
      await this.updateProfileUser.execute({
        userId,
        avatarUrl,
      });
   
  }
}