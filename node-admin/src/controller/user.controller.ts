import { Request, Response } from "express";
import { dataSource } from "..";
import bcryptjs from "bcryptjs";
import { User } from "../entity/user.entity";

export const Users = async (req: Request, res: Response) => {
  const take = 15;
  const page = parseInt((req.query.page as string) || "1");

  const repository = dataSource.getRepository(User);
  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ["role"],
  });

  res.send({
    data: data.map((u) => {
      const { password, ...data } = u;
      return data;
    }),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcryptjs.hash("1234", 10);

  const repository = dataSource.getRepository(User);

  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id,
    },
  });

  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = dataSource.getRepository(User);

  const { password, ...user } = await repository.findOne({
    where: {
      id: Number(req.params.id),
    },
    relations: ["role"],
  });

  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const repository = dataSource.getRepository(User);

  const user = await repository.findOne({
    where: {
      id: Number(req.params.id),
    },
    relations: ["role"],
  });

  await repository.merge(user, { ...body, role: { id: role_id } });
  const { password, ...data } = await repository.save(user);

  res.status(202).send(data);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = dataSource.getRepository(User);

  await repository.delete(req.params.id);

  res.status(204).send(null);
};
