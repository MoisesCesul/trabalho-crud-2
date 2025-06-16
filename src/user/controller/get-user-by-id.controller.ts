import { Controller, Get, Param } from "@nestjs/common";
import { GetUserByIdService } from "../service/get-user-by-id.service";

@Controller('/users/:id')
export class GetUsersByIdController {
  constructor(private getUserById: GetUserByIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    const users = await this.getUserById.execute({
      id,
    });

    return {
      users
    };
  }
}