import { Client, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
  data: Client
}

export class ListClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const data = request.body
      const createClientResponse = await listClientUseCase({ id, data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const listClientUseCase = async ({ data }: any): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const clients = await prisma.client.findMany(data)

  return {
    meta: {
      status: 200,
      message: "Clientos encontrado com sucesso.",
    },
    objects: clients,
  }
}
