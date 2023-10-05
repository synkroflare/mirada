import { User, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  username: string
  password: string
}

export class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body
      const createClientResponse = await login({ username, password })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const login = async ({
  username,
  password,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const user = await prisma.user.findUnique({
    where: {
      username_password: {
        username,
        password,
      },
    },
    include: {
      company: true,
      client: true,
    },
  })

  return {
    meta: {
      status: 200,
      message: "Usero encontrado com sucesso.",
    },
    objects: [user],
  }
}
