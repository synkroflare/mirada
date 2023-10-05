import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
}

export class ReadEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const createClientResponse = await readEventUseCase({ id })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const readEventUseCase = async ({
  id,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const event = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
  })

  return {
    meta: {
      status: 200,
      message: "Evento encontrado com sucesso.",
    },
    objects: [event],
  }
}
