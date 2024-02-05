import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { TResponse } from "../../../server/types/TResponse";

type TRequest = {
  id: string;
};

export class ReadClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const createClientResponse = await readClientUseCase({ id });

      return response.status(201).json(createClientResponse);
    } catch (error: any) {
      return response.status(400).send(error.message);
    }
  }
}

const readClientUseCase = async ({
  id,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient");
  const client = await prisma.client.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    meta: {
      status: 200,
      message: "Cliento encontrado com sucesso.",
    },
    objects: [client],
  };
};
