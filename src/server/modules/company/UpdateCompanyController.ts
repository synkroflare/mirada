import { Company, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  id: string
  data: Company
}

export class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const data = request.body
      const createClientResponse = await updateCompanyUseCase({ id, data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const updateCompanyUseCase = async ({
  id,
  data,
}: TRequest): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const company = await prisma.company.update({
    where: {
      id: Number(id),
    },
    data,
  })

  return {
    meta: {
      status: 200,
      message: "Companyo encontrado com sucesso.",
    },
    objects: [company],
  }
}
