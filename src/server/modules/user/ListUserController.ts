import { User, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
  data: User
}

export class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const data = request.body
      const createClientResponse = await listUserUseCase({ id, data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const listUserUseCase = async ({ data }: any): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const users = await prisma.user.findMany(data)

  return {
    meta: {
      status: 200,
      message: "Useros encontrado com sucesso.",
    },
    objects: users,
  }
}
