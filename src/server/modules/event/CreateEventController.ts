import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
}

export class CreateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body
      const createClientResponse = await createEventUseCase(data)

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const createEventUseCase = async (data: any): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const event = await prisma.event.create(data)

  return {
    meta: {
      status: 200,
      message: "Evento criado com sucesso.",
    },
    objects: [event],
  }
}
