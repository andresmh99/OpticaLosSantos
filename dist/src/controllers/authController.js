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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = exports.profile = void 0;
const usuarios_model_1 = require("../models/usuarios.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuarios_model_1.User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(400).json({
            ok: false,
            msj: "Usuario no encontrado"
        });
    }
    return res.json({
        ok: true,
        user
    });
});
exports.profile = profile;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new usuarios_model_1.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    //token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET_KEY || 'TokenIvalid');
    return res.header('auth-token', token).json({
        ok: true,
        msj: "Usuario creado satisfactoriamente",
        savedUser
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.email);
    try {
        const user = yield usuarios_model_1.User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json("El email o la contraseña no son correctos");
        const correctPassword = yield user.validatePassword(req.body.password);
        if (!correctPassword)
            return res.status(400).json("El email o la contraseña no son correctos");
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY || 'TokenIvalid', { expiresIn: 30000 });
        return res.header('auth-token', token).json({
            ok: true,
            msj: "Ingreso Correcto",
            user
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signin = signin;
//# sourceMappingURL=authController.js.map