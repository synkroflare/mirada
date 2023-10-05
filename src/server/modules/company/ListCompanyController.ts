import { Company, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { TResponse } from "server/types/TResponse"
import { container } from "tsyringe"

type TRequest = {
  data: Company
}

export class ListCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body
      const createClientResponse = await listCompanyUseCase({ data })

      return response.status(201).json(createClientResponse)
    } catch (error: any) {
      return response.status(400).send(error.message)
    }
  }
}

const listCompanyUseCase = async ({ data }: any): Promise<TResponse | void> => {
  const prisma = container.resolve<PrismaClient>("PrismaClient")
  const company = await prisma.company.findMany(data)

  return {
    meta: {
      status: 200,
      message: "Companyos encontrado com sucesso.",
    },
    objects: [company],
  }
}
