import { User, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
  data: User
}

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const data = request.body
      const createClientResponse = await updateUserUseCase({ id, data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const updateUserUseCase = async ({
  id,
  data,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  })

  return {
    meta: {
      status: 200,
      message: "Usero encontrado com sucesso.",
    },
    objects: [user],
  }
}
