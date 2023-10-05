import { Router } from "express"
import { eventRoutes } from "./event.routes"
import { companyRoutes } from "./company.routes.ts"
import { userRoutes } from "./user.routes"
import { clientRoutes } from "./client.routes.ts"

const router = Router()

router.use("/event/", eventRoutes)
router.use("/company/", companyRoutes)
router.use("/user/", userRoutes)
router.use("/client/", clientRoutes)

export { router }
