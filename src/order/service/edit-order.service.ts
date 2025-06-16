import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { OrdersRepository } from "../repository/order.repository";

interface EditOrdersServiceRequest {
    id: string;
    items?: {
        productId: string;
        quantity: number;
    }[];
}
@Injectable()
export class EditOrdersService {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({
        id,
        items,
    }: EditOrdersServiceRequest): Promise<void> {
        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new Error("Order not found");
        }

        await this.ordersRepository.updateOrderWithItems(id, items);
    }
}