import { Module } from "@nestjs/common";
import { ModelModule } from "./model/model.module";
import { ProductModule } from "./product/product.module";
import { ProfileModule } from "./profile/profile.module";
import { UserModule } from "./user/user.module";
import { OrderModule } from "./order/order.module";


@Module({
  imports: [ModelModule,ProductModule,ProfileModule,UserModule,OrderModule],
})
export class AppModule {}
