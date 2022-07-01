import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const todos = await prisma.todo.findMany();

    return res.status(200).json({
      data: todos,
    });
  } else if (method === "POST") {
    const { description } = req.body

    const todo = await prisma.todo.create({
      data: {
        description,
      }
    });

    return res.status(201).json({
      data: todo,
    });

  }

  return res.status(404).json({ message: "route note found." });
}
