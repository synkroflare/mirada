"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadUserController = void 0;
const tsyringe_1 = require("tsyringe");
class ReadUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const createClientResponse = yield readUserUseCase({ id });
                return response.status(201).json(createClientResponse);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.ReadUserController = ReadUserController;
const readUserUseCase = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = tsyringe_1.container.resolve("PrismaClient");
    const user = yield prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    return {
        meta: {
            status: 200,
            message: "Usero encontrado com sucesso.",
        },
        objects: [user],
    };
});
