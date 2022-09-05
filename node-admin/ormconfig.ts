import { DataSourceOptions } from "typeorm";

const ORM_CONFIG: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "Elephant@1",
  database: "mytestdb",
  entities: ["src/entity/*.ts"],
  logging: false,
  synchronize: true,
};

export { ORM_CONFIG };
