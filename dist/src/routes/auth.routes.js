"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const varifyTokens_1 = require("../libs/varifyTokens");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signup);
router.post('/signin', authController_1.signin);
router.get('/profile', varifyTokens_1.TokenValidation, authController_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map