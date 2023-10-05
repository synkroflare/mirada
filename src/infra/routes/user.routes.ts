import { Router } from "express"
import { CreateUserController } from "../../server/modules/user/CreateUserController"
import { ReadUserController } from "../../server/modules/user/ReadUserController"
import { UpdateUserController } from "../../server/modules/user/UpdateUserController"
import { ListUserController } from "../../server/modules/user/ListUserController"
import { LoginController } from "../../server/modules/user/LoginController"

const readUserController = new ReadUserController()
const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const listUserController = new ListUserController()
const loginController = new LoginController()

const userRoutes = Router()

userRoutes.get("/:id", readUserController.handle)
userRoutes.propfind("/list", listUserController.handle)
userRoutes.propfind("/login", loginController.handle)
userRoutes.post("/", createUserController.handle)
userRoutes.patch("/:id", updateUserController.handle)

export { userRoutes }
