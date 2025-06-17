import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteProfileService } from "../service/delete-profile.service";


@Controller('/profile/:id')
export class DeleteUserController {
  constructor(private deleteUser: DeleteProfileService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    await this.deleteUser.execute({
      id,
    });
  }
}