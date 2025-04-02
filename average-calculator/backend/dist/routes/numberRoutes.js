"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const numberController_1 = require("../controllers/numberController");
const router = (0, express_1.Router)();
router.get('/:numberid', numberController_1.getNumbers);
exports.default = router;
