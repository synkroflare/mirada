import { Event, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  data: any
}

export class ListEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body
      const createClientResponse = await listEventUseCase({ data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const listEventUseCase = async ({
  data,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const events = await prisma.event.findMany(data)

  return {
    meta: {
      status: 200,
      message: "Eventos encontrado com sucesso.",
    },
    objects: events,
  }
}
