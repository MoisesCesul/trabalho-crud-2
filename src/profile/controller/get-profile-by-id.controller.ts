import { Controller, Get, Param } from "@nestjs/common";
import { GetProfileByIdService } from "../service/get-profile-by-id.service";


@Controller('/profile/:id')
export class GetProfileByIdController {
  constructor(private getUserById: GetProfileByIdService) {}

  @Get()
  async handle(@Param("id") id: string) {
    const users = await this.getUserById.execute({
      id,
    });
    try {
       return {
      users
    };
    } catch (error) {
      return {
        statusCode: 404,
        error: error.message
      };
      
    }
   
  }
}