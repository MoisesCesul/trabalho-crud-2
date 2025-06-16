import { Controller, Get } from "@nestjs/common";
import { FetchRecentUsersService } from "../service/fetch-recent-users.service";

@Controller('/users')
export class FetchRecentUsersController {
  constructor(private fetchRecentUser: FetchRecentUsersService) {}

  @Get()
  async handle() {
    const user = await this.fetchRecentUser.execute();

    return {
      user
    };
  }
}