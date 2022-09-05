import { DataSource } from "typeorm";
import { ORM_CONFIG } from "../../ormconfig";
import { Product } from "../entity/product.entity";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
export const dataSource = new DataSource(ORM_CONFIG);

dataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been initialized!");
    const repository = dataSource.getRepository(Product);

    for (let i = 0; i < 30; i++) {
      await repository.save({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        image: faker.image.imageUrl(200, 200, "", true),
        price: randomInt(10, 100),
      });
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
