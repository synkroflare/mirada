import { Router } from "express"
import { CreateEventController } from "../../server/modules/event/CreateEventController"
import { ReadEventController } from "../../server/modules/event/ReadEventController"
import { UpdateEventController } from "../../server/modules/event/UpdateEventController"
import { ListEventController } from "../../server/modules/event/ListEventController"

const readEventController = new ReadEventController()
const createEventController = new CreateEventController()
const updateEventController = new UpdateEventController()
const listEventController = new ListEventController()

const eventRoutes = Router()

eventRoutes.get("/:id", readEventController.handle)
eventRoutes.propfind("/list", listEventController.handle)
eventRoutes.post("/", createEventController.handle)
eventRoutes.patch("/:id", updateEventController.handle)

export { eventRoutes }
