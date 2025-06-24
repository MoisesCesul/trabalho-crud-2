import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteUserService } from "../service/delete-user.service";


@Controller('/users/:id')
export class DeleteUserController {
  constructor(private deleteUser: DeleteUserService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    try {
      await this.deleteUser.execute({
      id,
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