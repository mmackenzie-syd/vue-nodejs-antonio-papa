/* Not Part of Course - added by me, for front end */

import { DataSource, GridFSBucketReadStream } from "typeorm";
import { ORM_CONFIG } from "../../ormconfig";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const dataSource = new DataSource(ORM_CONFIG);

dataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been connected!");
    const orderRepository = dataSource.getRepository(Order);
    const orderItemRepository = dataSource.getRepository(OrderItem);

    const userRepository = dataSource.getRepository(User);

    for (let i = 0; i < 30; i++) {
      // user
      const hashedPassword = await bcryptjs.hash("1234", 10);
      const user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: {
          id: 1, // admin rights
        },
      };

      await userRepository.save(user);

      // order
      const order = await orderRepository.save({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        created_at: faker.date.past(2).toISOString(),
      });

      // order items
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
