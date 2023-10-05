import { Event, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
  data: Event
}

export class UpdateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const data = request.body
      const createClientResponse = await updateEventUseCase({ id, data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const updateEventUseCase = async ({
  id,
  data,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const event = await prisma.event.update({
    where: {
      id: Number(id),
    },
    data,
  })

  return {
    meta: {
      status: 200,
      message: "Evento atualizado com sucesso.",
    },
    objects: [event],
  }
}
