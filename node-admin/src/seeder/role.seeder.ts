import { DataSource } from "typeorm";
import { ORM_CONFIG } from "../../ormconfig";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";

export const dataSource = new DataSource(ORM_CONFIG);

dataSource
  .initialize()
  .then(async (connection) => {
    console.log("Data Source has been initialized!");
    const permissionRepository = dataSource.getRepository(Permission);

    let permissions = [];

    const perms = [
      "view_users",
      "edit_users",
      "view_roles",
      "edit_roles",
      "view_products",
      "edit_products",
      "view_orders",
      "edit_orders",
    ];

    for (let i = 0; i < perms.length; i++) {
      permissions.push(
        await permissionRepository.save({
          name: perms[i],
        })
      );
    }

    const roleRepository = dataSource.getRepository(Role);

    await roleRepository.save({
      name: "Admin",
      permissions,
    });

    delete permissions[3]; // replaced with null when delete

    await roleRepository.save({
      name: "Editor",
      permissions,
    });

    delete permissions[1];
    delete permissions[5];
    delete permissions[7];

    await roleRepository.save({
      name: "Viewer",
      permissions,
    });

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
