"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const event_routes_1 = require("./event.routes");
const company_routes_ts_1 = require("./company.routes.ts");
const user_routes_1 = require("./user.routes");
const client_routes_ts_1 = require("./client.routes.ts");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/event/", event_routes_1.eventRoutes);
router.use("/company/", company_routes_ts_1.companyRoutes);
router.use("/user/", user_routes_1.userRoutes);
router.use("/client/", client_routes_ts_1.clientRoutes);
