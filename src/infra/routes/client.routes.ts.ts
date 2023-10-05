import { Router } from "express"
import { CreateClientController } from "../../server/modules/client/CreateClientController"
import { ReadClientController } from "../../server/modules/client/ReadClientController"
import { UpdateClientController } from "../../server/modules/client/UpdateClientController"
import { ListClientController } from "../../server/modules/client/ListClientController"

const readClientController = new ReadClientController()
const createClientController = new CreateClientController()
const updateClientController = new UpdateClientController()
const listClientController = new ListClientController()

const clientRoutes = Router()

clientRoutes.get("/:id", readClientController.handle)
clientRoutes.propfind("/list", listClientController.handle)
clientRoutes.post("/", createClientController.handle)
clientRoutes.patch("/:id", updateClientController.handle)

export { clientRoutes }
