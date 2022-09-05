import { DataSource } from "typeorm";
import { ORM_CONFIG } from "../../ormconfig";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";
export const dataSource = new DataSource(ORM_CONFIG);

dataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been initialized!");
    const orderRepository = dataSource.getRepository(Order);
    const orderItemRepository = dataSource.getRepository(OrderItem);

    for (let i = 0; i < 30; i++) {
      const order = await orderRepository.save({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        created_at: faker.date.past(2).toISOString(),
      });

      for (let j = 0; j < randomInt(1, 5); j++) {
        await orderItemRepository.save({
          order,
          product_title: faker.lorem.words(2),
          price: randomInt(10, 100),
          quantity: randomInt(1, 5),
        });
      }
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
