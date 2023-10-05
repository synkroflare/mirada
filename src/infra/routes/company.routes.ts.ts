import { Router } from "express"
import { CreateCompanyController } from "../../server/modules/company/CreateCompanyController"
import { ReadCompanyController } from "../../server/modules/company/ReadCompanyController"
import { UpdateCompanyController } from "../../server/modules/company/UpdateCompanyController"
import { ListCompanyController } from "../../server/modules/company/ListCompanyController"

const readCompanyController = new ReadCompanyController()
const createCompanyController = new CreateCompanyController()
const updateCompanyController = new UpdateCompanyController()
const listCompanyController = new ListCompanyController()

const companyRoutes = Router()

companyRoutes.get("/:id", readCompanyController.handle)
companyRoutes.propfind("/list", listCompanyController.handle)
companyRoutes.post("/", createCompanyController.handle)
companyRoutes.patch("/:id", updateCompanyController.handle)

export { companyRoutes }
